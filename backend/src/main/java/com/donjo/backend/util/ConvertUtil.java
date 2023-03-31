package com.donjo.backend.util;

import lombok.extern.slf4j.Slf4j;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;

@Slf4j
public class ConvertUtil {
    private static BigDecimal tenPowEighteen = BigDecimal.TEN.pow(18);

    public static LocalDateTime convertToLocalDateTime(BigInteger timestamp) {
        // Convert the BigInteger timestamp to a long value (seconds since epoch)
        long epochSeconds = timestamp.longValue();

        // Create an Instant object from the epoch seconds
        Instant instant = Instant.ofEpochSecond(epochSeconds);
        // Convert the Instant to a LocalDateTime object using the system default time zone
        LocalDateTime localDateTime = LocalDateTime.ofInstant(instant, ZoneId.systemDefault());

        return localDateTime;
    }

    public static BigInteger convertToUint256Timestamp(LocalDateTime localDateTime) {
        // Convert the LocalDateTime object to a ZonedDateTime object using the system default time zone
        ZonedDateTime zonedDateTime = localDateTime.atZone(ZoneId.systemDefault());

        // Get the epoch seconds from the ZonedDateTime object
        long epochSeconds = zonedDateTime.toEpochSecond();

        // Convert the epoch seconds to a BigInteger
        BigInteger timestamp = BigInteger.valueOf(epochSeconds);

        return timestamp;
    }

    public static BigInteger doubleToBigInteger(Double val){
        BigDecimal valBigDecimal = new BigDecimal(val.toString());
        BigDecimal multipliedVal = valBigDecimal.multiply(tenPowEighteen);
        log.info("Double = {} -> BigInteger = {} ",val, multipliedVal.toBigInteger());
        return multipliedVal.toBigInteger(); // 소수점 이하를 버린 정수 값
    }

    public static Double bigIntegerToDouble(BigInteger val){
        BigDecimal result = new BigDecimal(val).divide(tenPowEighteen);
        log.info("BigInteger = {} -> Double = {} ",val, result.doubleValue());
        return result.doubleValue();
    }
}
