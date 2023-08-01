package com.ssafy.move.service;

import com.ssafy.move.domain.ApplyForm;
import com.ssafy.move.domain.Members;
import com.ssafy.move.dto.request.ApplyFormRequestDto;
import com.ssafy.move.repository.ApplyFormRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

        System.out.println("ddddd");
        System.out.println(applyFormRequestDto.getF_arr_gungu());

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
}
