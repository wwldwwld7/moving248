package com.ssafy.move.service;

import com.ssafy.move.domain.*;
import com.ssafy.move.dto.request.ApplyFormRequestDto;
import com.ssafy.move.dto.response.ApplyFormResponseDto;
import com.ssafy.move.dto.response.GuResponseDto;
import com.ssafy.move.dto.response.SidoResponseDto;
import com.ssafy.move.repository.ApplyFormRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.Tuple;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ApplyFormService {

    private final ApplyFormRepository applyFormRepository;

//    @Autowired
//    public ApplyFormService(ApplyFormRepository applyFormRepository) {
//        this.applyFormRepository = applyFormRepository;
//    }

    @Transactional
    public void writeForm(ApplyFormRequestDto applyFormRequestDto) {

        ApplyForm applyForm = new ApplyForm();

        Members member = applyFormRepository.findMemberById(applyFormRequestDto.getM_id());

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
        applyForm.setFRoomVideoUrl(applyFormRequestDto.getVideo_File());
        applyForm.setFReqDesc(applyFormRequestDto.getF_req_desc());


        applyFormRepository.save(applyForm);
    }


    @Transactional
    public void updateApplyForm(int f_id, ApplyFormRequestDto applyFormRequestDto){

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
        applyForm.setFRoomVideoUrl(applyFormRequestDto.getVideo_File());
        applyForm.setFReqDesc(applyFormRequestDto.getF_req_desc());
        applyForm.setFCreateTime(applyForm.getFCreateTime());
        applyForm.setFModifyTime(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()));

        applyFormRepository.updateApplyForm(applyForm);
        //applyFormRepository.save(applyForm);

    }

    @Transactional
    public void deleteApplyForm(int f_id){

        applyFormRepository.deleteApplyForm(f_id);

    }

    @Transactional
    public List<ApplyFormResponseDto> findAll(){

        List<ApplyFormResponseDto> list = new ArrayList<>();

        //List<ApplyFormWithStatus> allForm = applyFormRepository.findAll();

        List<Tuple> allForm = applyFormRepository.findAll();


        for(Tuple af : allForm){

            ApplyFormResponseDto applyFormResponseDto = new ApplyFormResponseDto();
            ApplyForm applyForm = af.get(0,ApplyForm.class);
            FormStatus formStatus = af.get(1, FormStatus.class);


            applyFormResponseDto.setF_id(applyForm.getId());
            applyFormResponseDto.setF_status(formStatus.getStatusName());
            applyFormResponseDto.setF_date(applyForm.getFDate());
            applyFormResponseDto.setF_dep_sido(applyForm.getFDepSido());
            applyFormResponseDto.setF_dep_gungu(applyForm.getFDepGungu());
            applyFormResponseDto. setF_arr_sido(applyForm.getFArrSido());
            applyFormResponseDto.setF_arr_gungu(applyForm.getFArrGungu());
            applyFormResponseDto.setF_category(applyForm.getFCategory());

            list.add(applyFormResponseDto);

        }
        return list;
    }

    @Transactional
    public List<ApplyFormResponseDto> findApplyByCategory(String sido, String gungu, int category, int pId){

        List<ApplyFormResponseDto> list = new ArrayList<>();

        List<Tuple> option = applyFormRepository.findByOption(sido, gungu, category, pId);


        for(Tuple af : option){

            ApplyForm applyForm = af.get(0,ApplyForm.class);
            FormStatus formStatus = af.get(1, FormStatus.class);


            ApplyFormResponseDto applyFormResponseDto = new ApplyFormResponseDto(

                    applyForm.getId(), formStatus.getStatusName(), applyForm.getFDate(),
                    applyForm.getFDepSido(), applyForm.getFDepGungu(), applyForm.getFArrSido(),
                    applyForm.getFArrGungu(), applyForm.getFCategory()
            );
            list.add(applyFormResponseDto);
        }
        return list;
    }


    @Transactional
    public List<SidoResponseDto> getSido(){

        List<Sido> sido = applyFormRepository.getSido();

        List<SidoResponseDto> list = new ArrayList<>();

        for(Sido si : sido){

            SidoResponseDto sidoResponseDto = new SidoResponseDto(si.getSidoCode(),si.getSidoName());

            list.add(sidoResponseDto);

        }

        return list;
    }

    @Transactional
    public List<GuResponseDto> getGu(String sido){

        List<Gu> gu = applyFormRepository.getGu(sido);

        List<GuResponseDto> list = new ArrayList<>();

        for(Gu g : gu){

            GuResponseDto guResponseDto = new GuResponseDto(g.getGuCode(), g.getGuName());
            list.add(guResponseDto);
        }

        return list;
    }

    @Transactional
    public void updateFormStatus(int fId){
        applyFormRepository.updateFormStatus(fId);
    }


}
