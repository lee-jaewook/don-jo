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
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class SupportRepositorySupport {
    @PersistenceContext
    private EntityManager em;


//    public List<Support> findEarning(String address, String type, int period) {
//        String oneMonthDatetime = LocalDateTime.now().minusMonths(1).format(DateTimeFormatter.ofPattern("yyyy-MM-dd")); //어제 00:00:00
//        String threeMonthDatetime = LocalDateTime.now().minusMonths(3).format(DateTimeFormatter.ofPattern("yyyy-MM-dd")); //어제 00:00:00
//        String jpql = "select u from Support u";
//        String whereSql = " where u.toAddress = ";
//        whereSql+= "'"+address+"'";
//        List<String> whereCondition = new ArrayList<>();
//        if (type.equals("all")) {
//        }
//        else{
//            whereCondition.add(" and");
//        }
//        switch (type) {
//            case "donation":
//                whereCondition.add(" u.supportType = 'donation'");
//                break;
//            case "item":
//                whereCondition.add(" u.supportType = 'item'");
//                break;
//            case "wishlist":
//                whereCondition.add(" u.supportType = 'wishlist'");
//                break;
//            case "all":
//                break;
//        }
//        if (type !="all" && period != 0) {
//            whereCondition.add(" and ");
//        }
//        switch (period) {
//            case 0:
//                break;
//            case 30:
//                whereCondition.add("u.arriveTimeStamp >= "+oneMonthDatetime);
//                break;
//            case 90:
//                whereCondition.add("u.arriveTimeStamp >= "+threeMonthDatetime);
//                break;
//        }
//        jpql += whereSql;
//        jpql += String.join("", whereCondition);
//
//        TypedQuery<Support> query = em.createQuery(jpql, Support.class);
//        return query.getResultList();
//    }

    public List<Support> findEarning(String address, String type, int period) {
        // StringBuilder는 문자열을 효율적으로 다룰 수 있게 하는 클래스 JPQL을 담을 변수
        StringBuilder jpqlBuilder = new StringBuilder("SELECT s FROM Support s WHERE s.toAddress = :address");
        // HashMap으로 변수값을 넣어줌
        HashMap<String, Object> parameters = new HashMap<>();
        parameters.put("address", address);

        // all을 제외한 값이 들어오면 변수 값에 넣어줌
        if (!type.equals("all")) {
            jpqlBuilder.append(" AND s.supportType = :type");
            parameters.put("type", type);
        }

        // period가 0을 제외한 값이 들어오면 30 90에 해당하는 쿼리문 추가
        if (period != 0) {
            LocalDateTime targetDate = LocalDateTime.now();
            if (period == 30) {
                targetDate = targetDate.minusMonths(1);
            } else if (period == 90) {
                targetDate = targetDate.minusMonths(3);
            }
            jpqlBuilder.append(" AND s.arriveTimeStamp >= :targetDate");
            parameters.put("targetDate", targetDate);
        }
        // jpqlBuilder.toString()에 저장된 JPQL 쿼리 문자열을 실행하고, 결과로 TypedQuery<Support> 객체를 반환합니다.
        TypedQuery<Support> query = em.createQuery(jpqlBuilder.toString(), Support.class);
        // JPQL 쿼리문에는 :address, :type, :targetDate와 같은 파라미터 표기법이 있으며, TypedQuery 파라미터값을 전달.
        for (Map.Entry<String, Object> entry : parameters.entrySet()) {
            query.setParameter(entry.getKey(), entry.getValue());
        }

        return query.getResultList();
    }

    public List<Support> findTop10() {
        // 도착시간이 not null인 최근 후원 10개 조회 쿼리
        String jpql = "select u from Support u where u.arriveTimeStamp IS NOT NULL order by u.arriveTimeStamp desc";
        TypedQuery<Support> query = em.createQuery(jpql, Support.class);

        // 10개만 리턴
        return query.setMaxResults(10).getResultList();
    }
}
