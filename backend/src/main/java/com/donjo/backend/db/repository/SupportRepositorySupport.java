package com.donjo.backend.db.repository;

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


    public List<?> findEarning(String address, String type,int period) {

        String jpql = "select u from Member u"; //member support로 바꿔야함
        String whereSql = " where u.userId = 'address' and "; //support adress
        List<String> whereCondition = new ArrayList<>();
        LocalDate todayLocalDate = LocalDate.now();
        // 스위치문 수정해줘야함
        switch (type) {
            case "donation":
                whereCondition.add("u.type = 'donation'");
                break;
            case "item":
                whereCondition.add("u.type = 'item'");
                break;
            case "wishlist ":
                whereCondition.add("u.type = 'wishlist'");
                break;
            case "all":
                break;
        }
        if (type != "all") {
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
        jpql += " order by u.id desc";
        System.out.println(jpql);
//        TypedQuery<User> query = em.createQuery(jpql, User.class);

//        return query.setFirstResult(z).setMaxResults(w).getResultList();
        return null;
    }

    public List<?> findTop10() {

        String jpql = "select u from Member u"; //member support로 바꿔야함
        String whereSql = " where u.userId is not null limit 10"; //support 날짜가 not null

        System.out.println(whereSql);
        jpql += whereSql;
        System.out.println(jpql);
//        TypedQuery<User> query = em.createQuery(jpql, User.class);

//        return query.setFirstResult(z).setMaxResults(w).getResultList();
        return null;
    }

}
