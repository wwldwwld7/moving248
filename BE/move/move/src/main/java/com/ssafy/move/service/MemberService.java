package com.ssafy.move.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.move.domain.ApplyForm;
import com.ssafy.move.domain.Members;
import com.ssafy.move.dto.request.*;
import com.ssafy.move.dto.response.MemberResponse;
import com.ssafy.move.exception.BadRequestException;
import com.ssafy.move.jwt.JwtProvider;
import com.ssafy.move.jwt.Token;
import com.ssafy.move.repository.ApplyFormRepository;
import com.ssafy.move.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;
    private final S3UploaderService s3UploaderService;
    private final ApplyFormRepository applyFormRepository;

    //유저 회원가입
    @Transactional
    public MemberResponse signUpUser(SignUpUserRequest signUpUserRequest){
        boolean isExist = memberRepository.existsByEmail(signUpUserRequest.getEmail());

        if(isExist) throw new BadRequestException("이미 존재하는 이메일 입니다.");

        String encodedPassword = passwordEncoder.encode(signUpUserRequest.getPassword());

        Members member = new Members();
        member.setMemberType('u');
        member.setName(signUpUserRequest.getName());
        member.setPhone((signUpUserRequest.getPhone()));
        member.setEmail(signUpUserRequest.getEmail());
        member.setPassword(encodedPassword);

        member = memberRepository.save(member);

        return MemberResponse.of(member);
    }
    
    //파트너 회원가입
    @Transactional
    public MemberResponse signUpPartner(SignUpPartnerRequest signUpPartnerRequest){
        boolean isExist = memberRepository.existsByEmail(signUpPartnerRequest.getEmail());

        if(isExist) throw new BadRequestException("이미 존재하는 이메일 입니다.");

        String encodedPassword = passwordEncoder.encode(signUpPartnerRequest.getPassword());

        Members member = new Members();
        member.setMemberType('p');
        member.setName(signUpPartnerRequest.getName());
        member.setPhone((signUpPartnerRequest.getPhone()));
        member.setEmail(signUpPartnerRequest.getEmail());
        member.setPassword(encodedPassword);
        member.setPCode(signUpPartnerRequest.getP_code());
        member.setPCeo(signUpPartnerRequest.getP_ceo());
        int exp = 2023-Integer.parseInt(signUpPartnerRequest.getP_exp().substring(0,4));
        member.setPExp(exp);
        member.setPLocation(signUpPartnerRequest.getP_location());
        member.setProfileUrl("https://yeonybucket.s3.ap-northeast-2.amazonaws.com/file/a22035c2-b867-448e-9795-2047c52a1738bdc34ad6-d794-4002-846a-565bda6a02d9.jpg");

        member = memberRepository.save(member);

        return MemberResponse.of(member);
    }

    @Transactional
    public void deleteMember(int id) {

        Members member = memberRepository.findById(id)
                .orElseThrow(()->new BadRequestException("유저가 존재하지 않습니다."));

        if (member.getMemberType()=='p'){

            List<ApplyForm> applyList = applyFormRepository.findApplyByPId(member.getId());

            for(ApplyForm af : applyList){

                if (af.getFStatus()!=3){
                    System.out.println("fffff");
                    //applyFormRepository.updateFormStatus(af.getId());
                    af.setFStatus('1');
                    af.setPId(null);
                }
            }
        }
        memberRepository.deleteById(id);
    }

    public MemberResponse logIn(LogInRequest logInRequest){
        Members member = memberRepository.findByEmail(logInRequest.getEmail())
                .orElseThrow(()->new BadRequestException("존재하지 않는 이메일 입니다."));

        //비밀번호가 인코딩 되어서 저장되면 이걸로 비교해야함.
        boolean pwCheck = passwordEncoder.matches(logInRequest.getPassword(), member.getPassword());
        //지금은 내가 데이터에 직접 값을 넣어서 인코딩 되어있지 않으니까 이거 썼음
//        boolean pwCheck = logInRequest.getPassword().equals(member.getPassword());
        if(!pwCheck) throw new BadRequestException("이메일 혹은 비밀번호를 확인하세요.");

        return MemberResponse.of(member);
    }

    @Transactional
    public void updateUser(int id, UpdateUserRequest updateUserRequest, HttpServletRequest request) throws JsonProcessingException {
        Members member = memberRepository.findById(id)
                .orElseThrow(()->new BadRequestException("유저가 존재하지 않습니다."));

//        Token tk = jwtProvider.getToken(request.getHeader("Authorization"));
//
//        if(!tk.getEmail().equals(member.getEmail())) throw new BadRequestException("토큰 정보가 다릅니다.");

        member.setPhone(updateUserRequest.getPhone());

        if(!member.getPassword().equals(updateUserRequest.getPassword())){
            String encodedPassword = passwordEncoder.encode(updateUserRequest.getPassword());
            member.setPassword(encodedPassword);
        }
//        String encodedPassword = passwordEncoder.encode(updateUserRequest.getPassword());
//        member.setPassword(encodedPassword);

        member = memberRepository.save(member);
    }

    @Transactional
    public void updatePartner(int id, UpdatePartnerRequest updatePartnerRequest, MultipartFile multipartFile, HttpServletRequest request) throws IOException {
        Members member = memberRepository.findById(id)
                .orElseThrow(()->new BadRequestException("유저가 존재하지 않습니다."));


//        Token tk = jwtProvider.getToken(request.getHeader("Authorization"));
//
//        if(!tk.getEmail().equals(member.getEmail())) throw new BadRequestException("토큰 정보가 다릅니다.");


        member.setName(updatePartnerRequest.getName());
        member.setPCeo(updatePartnerRequest.getP_ceo());
        member.setPExp(updatePartnerRequest.getP_exp());
        member.setPhone(updatePartnerRequest.getPhone());
        member.setPEmpCnt(updatePartnerRequest.getP_emp_cnt());
        member.setPStartTime(updatePartnerRequest.getP_starttime());
        member.setPEndTime(updatePartnerRequest.getP_endtime());
        member.setPDesc(updatePartnerRequest.getP_desc());
        member.setPLocation(updatePartnerRequest.getP_location());

        // 만약 정보수정할 때 이미지 업로드 안 할 경우

        
        if (multipartFile != null) {
            String profileUrl = s3UploaderService.uploadFileByClient(multipartFile, "yeonybucket", "file");
            member.setProfileUrl(profileUrl);
        } else {
            if (member.getProfileUrl() == null){
                member.setProfileUrl(null);
                System.out.println(member.getProfileUrl());
            } else {
                member.setProfileUrl(member.getProfileUrl());
                System.out.println(member.getProfileUrl());
            }

        }

        if(!member.getPassword().equals(updatePartnerRequest.getPassword())){
            System.out.println(member.getPassword()+" : "+updatePartnerRequest.getPassword());
            System.out.println("비밀번호가 다를때만 수정된다.");
            String encodedPassword = passwordEncoder.encode(updatePartnerRequest.getPassword());
            member.setPassword(encodedPassword);
        }



        member = memberRepository.save(member);
    }

}
