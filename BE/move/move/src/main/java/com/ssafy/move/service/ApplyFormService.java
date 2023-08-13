package com.ssafy.move.service;

import com.ssafy.move.domain.*;
import com.ssafy.move.dto.request.ApplyFormRequestDto;
import com.ssafy.move.dto.response.*;
import com.ssafy.move.repository.ApplyFormRepository;
import com.ssafy.move.repository.SuggestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.Tuple;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
@EnableScheduling
public class ApplyFormService {

    private final ApplyFormRepository applyFormRepository;
    private final SuggestionRepository suggestionRepository;
    private final S3UploaderService s3UploaderService;

    // 이사날짜 지나면 자동으로 신청서 상태 이사완료로 변경
    @Scheduled(cron = "0 0 0 * * *") // 새벽12시 되자마자 실행
    @Transactional
    public void updateFormStatusAutomatically() throws ParseException {
        List<ApplyForm> applyForms = applyFormRepository.findAllApplyForm(); // 모든 신청서 조회

        Date currentDate = new Date();

        for (ApplyForm applyForm : applyForms) {

            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

            String dateString = applyForm.getFDate();

            Date fDate = sdf.parse(dateString);

            if (currentDate.after(fDate)) {
                applyFormRepository.updateFormStatus(applyForm.getId());
            }
        }
    }


    // 신청서 유무
    @Transactional
    public int existForm(int uId) {
        List<ApplyForm> applyForms = applyFormRepository.existForm(uId);

        System.out.println(applyForms.size());

        if (applyForms.size() == 0)
            return 0;
        else
            return applyForms.get(0).getId();
    }

    //신청서 작성
    @Transactional
    public void writeForm(ApplyFormRequestDto applyFormRequestDto, MultipartFile multipartFile) throws IOException {

        ApplyForm applyForm = new ApplyForm();

        Members member = applyFormRepository.findMemberById(applyFormRequestDto.getM_id());


        String videoUrl = s3UploaderService.uploadFileByClient(multipartFile, "yeonybucket", "file");


        applyForm.setUId(member);
        applyForm.setFCategory(applyFormRequestDto.getF_category());
        applyForm.setFDate(applyFormRequestDto.getF_date());
        applyForm.setFDepSido(applyFormRequestDto.getF_dep_sido());
        applyForm.setFDepGungu(applyFormRequestDto.getF_dep_gungu());
        applyForm.setFDepEv(applyFormRequestDto.getF_dep_ev());
        applyForm.setFDepLadder(applyFormRequestDto.getF_dep_ladder());
        applyForm.setFArrSido(applyFormRequestDto.getF_arr_sido());
        applyForm.setFArrGungu(applyFormRequestDto.getF_arr_gungu());
        applyForm.setFArrEv(applyFormRequestDto.getF_arr_ev());
        applyForm.setFArrLadder(applyFormRequestDto.getF_arr_ladder());
        applyForm.setFRoomVideoUrl(videoUrl);
        applyForm.setFReqDesc(applyFormRequestDto.getF_req_desc());


        applyFormRepository.save(applyForm);
    }


    // 신청서 수정
    @Transactional
    public void updateApplyForm(int f_id, ApplyFormRequestDto applyFormRequestDto, MultipartFile multipartFile) throws IOException {

        ApplyForm applyForm = applyFormRepository.findApplyFormById(f_id);


        applyForm.setFCategory(applyFormRequestDto.getF_category());
        applyForm.setFDate(applyFormRequestDto.getF_date());
        applyForm.setFDepSido(applyFormRequestDto.getF_dep_sido());
        applyForm.setFDepGungu(applyFormRequestDto.getF_dep_gungu());
        applyForm.setFDepEv(applyFormRequestDto.getF_dep_ev());
        applyForm.setFDepLadder(applyFormRequestDto.getF_dep_ladder());
        applyForm.setFArrSido(applyFormRequestDto.getF_arr_sido());
        applyForm.setFArrGungu(applyFormRequestDto.getF_arr_gungu());
        applyForm.setFArrEv(applyFormRequestDto.getF_arr_ev());
        applyForm.setFArrLadder(applyFormRequestDto.getF_arr_ladder());


        if (multipartFile != null) {
            String videoUrl = s3UploaderService.uploadFileByClient(multipartFile, "yeonybucket", "file");
            applyForm.setFRoomVideoUrl(videoUrl);
        }

        applyForm.setFReqDesc(applyFormRequestDto.getF_req_desc());
        applyForm.setFCreateTime(applyForm.getFCreateTime());
        applyForm.setFModifyTime(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()));

        applyFormRepository.updateApplyForm(applyForm);

    }


    // 신청서 삭제
    @Transactional
    public void deleteApplyForm(int f_id) {

        applyFormRepository.deleteApplyForm(f_id);

    }

    // 신청서 전체조회
    @Transactional
    public List<ApplyFormResponseDto> findAll() {

        List<ApplyFormResponseDto> list = new ArrayList<>();


        List<Tuple> allForm = applyFormRepository.findAll();


        for (Tuple af : allForm) {

            ApplyFormResponseDto applyFormResponseDto = new ApplyFormResponseDto();

            ApplyForm applyForm = af.get(0, ApplyForm.class);
            //FormStatus formStatus = af.get(1, FormStatus.class);
            MoveCategory moveCategory = af.get(1, MoveCategory.class);

            String depSido = af.get(2, String.class);
            String depGu = af.get(3, String.class);
            String arrSido = af.get(4, String.class);
            String arrGu = af.get(5, String.class);

            applyFormResponseDto.setF_id(applyForm.getId());
            applyFormResponseDto.setU_id(applyForm.getUId().getId());

            if (applyForm.getPId() == null)
                applyFormResponseDto.setP_id(0);
            else
                applyFormResponseDto.setP_id(applyForm.getPId().getId());

            applyFormResponseDto.setF_status(applyForm.getFStatus() - '0');
            applyFormResponseDto.setF_date(applyForm.getFDate());

            applyFormResponseDto.setF_dep_sido(depSido);
            applyFormResponseDto.setF_dep_gungu(depGu);
            applyFormResponseDto.setF_arr_sido(arrSido);
            applyFormResponseDto.setF_arr_gungu(arrGu);

            applyFormResponseDto.setF_category(moveCategory.getCategoryName());

            list.add(applyFormResponseDto);

        }
        return list;
    }

    // 카테고리별 신청서 조회
    @Transactional
    public List<ApplyFormResponseDto> findApplyByCategory(String sido, String gungu, int category, int pId) {

        List<ApplyFormResponseDto> list = new ArrayList<>();

        List<Tuple> option = applyFormRepository.findByOption(sido, gungu, category, pId);


        outer:
        for (Tuple af : option) {

            ApplyForm applyForm = af.get(0, ApplyForm.class);
            //FormStatus formStatus = af.get(1, FormStatus.class);
            MoveCategory moveCategory = af.get(1, MoveCategory.class);

            String depSido = af.get(2, String.class);
            String depGu = af.get(3, String.class);
            String arrSido = af.get(4, String.class);
            String arrGu = af.get(5, String.class);


            ApplyFormResponseDto applyFormResponseDto = new ApplyFormResponseDto();

            applyFormResponseDto.setF_id(applyForm.getId());
            applyFormResponseDto.setU_id(applyForm.getUId().getId());

            if (applyForm.getPId() == null)
                applyFormResponseDto.setP_id(0);
            else
                applyFormResponseDto.setP_id(applyForm.getPId().getId());


            applyFormResponseDto.setF_status(applyForm.getFStatus() - '0');

            int status = applyForm.getFStatus() - '0';


            // 입찰중
            if (status == 1) {
                applyFormResponseDto.setF_status_name("입찰");
            } else if (status == 2) {
                applyFormResponseDto.setF_status_name("확정");
            } else {
                applyFormResponseDto.setF_status_name("완료");
            }

            applyFormResponseDto.setF_date(applyForm.getFDate());
            applyFormResponseDto.setF_dep_sido(depSido);
            applyFormResponseDto.setF_dep_gungu(depGu);
            applyFormResponseDto.setF_arr_sido(arrSido);
            applyFormResponseDto.setF_arr_gungu(arrGu);
            applyFormResponseDto.setF_category(moveCategory.getCategoryName());

            //시도,군구에 맞는 신청서들의 견적서들을 가져온다.
            List<Suggestion> sjtList = suggestionRepository.findAllSuggestionByFid(applyForm.getId());

            // 참여
            if (category == 2) {
                for (Suggestion sjt : sjtList) {
                    if (sjt.getPId().getId() == pId && applyForm.getFStatus()-'0' != 3) { //해당 신청서의 견적서들 중 내 견적이 있는 경우
                        list.add(applyFormResponseDto);
                        break;
                    }
                }
            }
            // 미참여
            else if (category == 3) {
                for (Suggestion sjt : sjtList) {
                    // 해당 신청서의 견적서리스트 중에서 내 견적서가 있는 신청서는
                    // tuple 부분 강제로 다음 index로 continue 하도록
                    if (sjt.getPId().getId() == pId) {
                        continue outer;
                    }
                }
                if(applyForm.getFStatus()-'0' == 1 )
                    list.add(applyFormResponseDto);
            }
            // 확정
            else if (category == 4) {
                if (applyForm.getPId() != null && applyForm.getPId().getId() == pId) {
                    list.add(applyFormResponseDto);
                }
            }
            //전체
            else {
                list.add(applyFormResponseDto);
            }
        }
        return list;
    }

    // 신청서 상세조회
    @Transactional
    public DetailApplyFormResponseDto findDetailApplyById(int fId) {

        List<Suggestion> suggestionList = suggestionRepository.findAllSuggestionByFid(fId);

        List<Tuple> detail = applyFormRepository.findDetailApplyById(fId);

        DetailApplyFormResponseDto detailApply = new DetailApplyFormResponseDto();

        for (Tuple af : detail) {

            ApplyForm applyForm = af.get(0, ApplyForm.class);
            //FormStatus formStatus = af.get(1, FormStatus.class);
            MoveCategory moveCategory = af.get(1, MoveCategory.class);

            Sido sido1 = af.get(2, Sido.class);
            Gu gu1 = af.get(3, Gu.class);
            Sido sido2 = af.get(4, Sido.class);
            Gu gu2 = af.get(5, Gu.class);


            detailApply.setF_id(applyForm.getId());
            detailApply.setU_id(applyForm.getUId().getId());
            if (applyForm.getPId() != null)
                detailApply.setP_id(applyForm.getPId().getId());
            //detailApply.setP_id(0);

            detailApply.setUserName(applyForm.getUId().getName());
            detailApply.setF_category(moveCategory.getCategoryName());
            detailApply.setF_date(applyForm.getFDate());
            detailApply.setF_dep_sido(sido1.getSidoName());
            detailApply.setF_dep_gungu(gu1.getGuName());
            detailApply.setF_dep_ev(applyForm.getFDepEv());
            detailApply.setF_dep_ladder(applyForm.getFDepLadder());
            detailApply.setF_arr_sido(sido2.getSidoName());
            detailApply.setF_arr_gungu(gu2.getGuName());
            detailApply.setF_arr_ev(applyForm.getFArrEv());
            detailApply.setF_arr_ladder(applyForm.getFArrLadder());
            detailApply.setF_room_video_url(applyForm.getFRoomVideoUrl());
            detailApply.setF_req_desc(applyForm.getFReqDesc());
            detailApply.setF_status(applyForm.getFStatus() - '0'); // int 여서

            // 신청서 수정화면에서 주소값 가져올 때 코드 필요해서
            detailApply.setF_dep_sido_code(Integer.parseInt(sido1.getSidoCode()));
            detailApply.setF_dep_gungu_code(Integer.parseInt(gu1.getGuCode()));
            detailApply.setF_arr_sido_code(Integer.parseInt(sido2.getSidoCode()));
            detailApply.setF_arr_gungu_code(Integer.parseInt(gu2.getGuCode()));
        }

        List<DetailSuggestionResponseDto> suggestionResponseDtoList = new ArrayList<>();

        if (suggestionList.size() != 0) {

            for (Suggestion s : suggestionList) {

                DetailSuggestionResponseDto detailSuggestion = new DetailSuggestionResponseDto();

                detailSuggestion.setP_id(s.getPId().getId());
                detailSuggestion.setName(s.getPId().getName());
                detailSuggestion.setProfile_url(s.getPId().getProfileUrl());
                detailSuggestion.setP_move_cnt(s.getPId().getPMoveCnt());
                detailSuggestion.setS_money(s.getSMoney());
                detailSuggestion.setS_desc(s.getSDesc());
                detailSuggestion.setS_create_time(s.getSModifyTime());

                // 만약 제안서의 업체id 와 신청서의 업체 아이디와 같다면
                if (s.getPId().getId() == detailApply.getP_id()) {
                    detailSuggestion.setIs_selected("t");
                } else {
                    detailSuggestion.setIs_selected("f");
                }

                suggestionResponseDtoList.add(detailSuggestion);
            }

            detailApply.setList(suggestionResponseDtoList);
        }

        return detailApply;
    }


    // 시도 가져오기
    @Transactional
    public List<SidoResponseDto> getSido() {

        List<Sido> sidoList = applyFormRepository.getSido();

        List<SidoResponseDto> list = new ArrayList<>();

        for (Sido si : sidoList) {

            SidoResponseDto sidoResponseDto = new SidoResponseDto(si.getSidoCode(), si.getSidoName());

            list.add(sidoResponseDto);

        }

        return list;
    }

    // 군구 가져오기
    @Transactional
    public List<GuResponseDto> getGu(String sido) {

        List<Gu> gu = applyFormRepository.getGu(sido);

        List<GuResponseDto> list = new ArrayList<>();

        for (Gu g : gu) {

            GuResponseDto guResponseDto = new GuResponseDto(g.getGuCode(), g.getGuName());
            list.add(guResponseDto);
        }

        return list;
    }

    // 신청서 상태 수정
    @Transactional
    public void updateFormStatus(int fId) {
        //
        applyFormRepository.updateFormStatus(fId);
    }

}
