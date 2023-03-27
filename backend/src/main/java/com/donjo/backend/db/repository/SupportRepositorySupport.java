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
        String whereSql = " where u.toAddress = ";
        whereSql+= "'"+address+"'";
        List<String> whereCondition = new ArrayList<>();
        if (type.equals("all")) {
        }
        else{
            whereCondition.add(" and");
        }
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
                whereCondition.add("u.arriveTimeStamp >= "+oneMonthDatetime);
                break;
            case 90:
                whereCondition.add("u.arriveTimeStamp >= "+threeMonthDatetime);
                break;
        }
        jpql += whereSql;
        jpql += String.join("", whereCondition);

        TypedQuery<Support> query = em.createQuery(jpql, Support.class);
        return query.getResultList();
    }

    public List<Support> findTop10() {
        String jpql = "select u from Support u";
        String whereSql = " where u.arriveTimeStamp IS NOT NULL order by u.arriveTimeStamp desc";

        jpql += whereSql;

        TypedQuery<Support> query = em.createQuery(jpql, Support.class);
        return query.setMaxResults(10).getResultList();
    }
}
