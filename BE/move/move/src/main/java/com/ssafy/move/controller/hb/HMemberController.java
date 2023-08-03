package com.ssafy.move.controller.hb;

import com.ssafy.move.dto.response.PartnerDetailDto;
import com.ssafy.move.dto.response.PartnerViewDto;
import com.ssafy.move.dto.response.UserViewDto;
import com.ssafy.move.service.hb.HMemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class HMemberController {

    private final HMemberService memberService;

    @GetMapping("/user/{m_id}")
    public ResponseEntity<Map<String,Object>> findUserById(@PathVariable("m_id") int m_id){
        Map<String, Object> rsmap = new HashMap<>();
        UserViewDto userViewDto = memberService.findUserById(m_id);
        rsmap.put("data",userViewDto);
        return new ResponseEntity<Map<String,Object>>(rsmap, HttpStatus.OK);
    }
    @GetMapping("/partner")
    public ResponseEntity<Map<String,Object>> findAllPartner(){
        Map<String, Object> rsmap = new HashMap<>();
        List<PartnerViewDto> partnerViewDtoList = memberService.findAllPartner();
        rsmap.put("data",partnerViewDtoList);
        return new ResponseEntity<Map<String,Object>>(rsmap, HttpStatus.OK);
    }
    @GetMapping("/partner/{m_id}")
    public ResponseEntity<Map<String,Object>> findPartnerById(@PathVariable("m_id")int m_id){
        Map<String, Object> rsmap = new HashMap<>();
        PartnerDetailDto partnerDetailDto = memberService.findPartnerById(m_id);
        rsmap.put("data",partnerDetailDto);
        return new ResponseEntity<Map<String,Object>>(rsmap, HttpStatus.OK);
    }
}
