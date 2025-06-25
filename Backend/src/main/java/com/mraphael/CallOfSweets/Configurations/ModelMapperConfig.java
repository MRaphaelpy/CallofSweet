package com.mraphael.CallOfSweets.Configurations;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;

@Configuration
public class ModelMapperConfig {

    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();

        modelMapper.getConfiguration()
                .setMatchingStrategy(MatchingStrategies.STRICT)
                .setSkipNullEnabled(true)
                .setFieldMatchingEnabled(true)
                .setFieldAccessLevel(org.modelmapper.config.Configuration.AccessLevel.PRIVATE);


        modelMapper.createTypeMap(Float.class, BigDecimal.class)
                .setConverter(context -> context.getSource() != null ?
                        BigDecimal.valueOf(context.getSource().doubleValue()) : null);

        modelMapper.createTypeMap(Integer.class, Long.class)
                .setConverter(context -> context.getSource() != null ?
                        context.getSource().longValue() : null);

        return modelMapper;
    }
}