package com.donjo.backend.db.repository;

import com.donjo.backend.db.entity.Support;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Repository
public class SupportRepositorySupport {
    @PersistenceContext
    private EntityManager em;


    public List<Support> findEarning(String address, String type, int period) {

        String jpql = "select u from Support u";
        String whereSql = " where u.toAddress = "; //support adress where u.userId = 'address'
        whereSql+= address;
        List<String> whereCondition = new ArrayList<>();
        LocalDate todayLocalDate = LocalDate.now();
        // 스위치문 수정해줘야함
        switch (type) {
            case "donation":
                whereCondition.add(" u.supportType = 'donation'");
                break;
            case "item":
                whereCondition.add(" u.supportType = 'item'");
                break;
            case "wishlist":
                whereCondition.add(" u.supportType = 'wishlist'");
                break;
            case "all":
                break;
        }
        if (type != "all" && period != 0) {
            whereCondition.add(" and ");
        }
        switch (period) {
            case 0:
                break;
            case 30:
                LocalDate oneMonthBeforeDate = todayLocalDate.minusMonths(1);
                whereCondition.add("u.date > DATE_SUB(now(), INTERVAL -1 MONTH");
                break;
            case 90:
                whereCondition.add("u.date > DATE_SUB(now(), INTERVAL -3 MONTH");
                break;
        }
        System.out.println(whereCondition);
        jpql += whereSql;
        jpql += String.join("", whereCondition);

        System.out.println(jpql);
        TypedQuery<Support> query = em.createQuery(jpql, Support.class);

        return query.getResultList();
    }


}
