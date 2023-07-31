package com.ssafy.move;

import com.ssafy.move.domain.ApplyForm;
import com.ssafy.move.domain.FormStatus;
import com.ssafy.move.domain.Members;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;

@SpringBootTest

public class test1 {
    @Autowired
    private EntityManager em;

    @Test
    public void test(){
        FormStatus formStatus = em.find(FormStatus.class, '1');
        System.out.println(formStatus.getStatusName());
    }

    @Test
    @Transactional
    public void membertest(){
        ApplyForm applyForm = em.find(ApplyForm.class, 1);
        System.out.println(applyForm.getUId());
        System.out.println(applyForm.getPId());
    }


}
