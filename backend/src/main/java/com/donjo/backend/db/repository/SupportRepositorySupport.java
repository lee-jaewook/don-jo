package com.donjo.backend.db.repository;

import com.donjo.backend.db.entity.Support;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Repository
public class SupportRepositorySupport {
    @PersistenceContext
    private EntityManager em;


    public List<Support> findEarning(String address, String type, int period) {
        String oneMonthDatetime = LocalDateTime.now().minusMonths(1).format(DateTimeFormatter.ofPattern("yyyy-MM-dd")); //어제 00:00:00
        String threeMonthDatetime = LocalDateTime.now().minusMonths(3).format(DateTimeFormatter.ofPattern("yyyy-MM-dd")); //어제 00:00:00
        String jpql = "select u from Support u";
        String whereSql = " where u.toAddress = "; //support adress where u.userId = 'address'
        whereSql+= "'"+address+"'";
        List<String> whereCondition = new ArrayList<>();
        if (type.equals("all")) {
        }
        else{
            whereCondition.add(" and");
        }
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
        if (type !="all" && period != 0) {
            whereCondition.add(" and ");
        }
        switch (period) {
            case 0:
                break;
            case 30:
//                LocalDate oneMonthBeforeDate = todayLocalDate.minusMonths(1);
                whereCondition.add("u.arriveTimeStamp >= "+oneMonthDatetime);
                break;
            case 90:
                whereCondition.add("u.arriveTimeStamp >= "+threeMonthDatetime);
                break;
        }
        System.out.println(whereCondition);
        jpql += whereSql;
        jpql += String.join("", whereCondition);

        System.out.println(jpql);
        TypedQuery<Support> query = em.createQuery(jpql, Support.class);
        System.out.println(query.getResultList());
        return query.getResultList();
    }

    public List<Support> findTop10() {
        String jpql = "select u from Support u";
        String whereSql = " where u.arriveTimeStamp IS NOT NULL"; //support adress where u.userId = 'address'

        jpql += whereSql;

        System.out.println(jpql);
        TypedQuery<Support> query = em.createQuery(jpql, Support.class);
        System.out.println(query.getResultList());
        return query.getResultList();
    }
}
