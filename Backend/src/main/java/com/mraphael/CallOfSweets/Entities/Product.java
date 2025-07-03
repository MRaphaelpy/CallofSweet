package com.mraphael.CallOfSweets.Entities;

        import com.fasterxml.jackson.annotation.JsonIdentityInfo;
        import com.fasterxml.jackson.annotation.ObjectIdGenerators;
        import jakarta.persistence.*;
        import lombok.Data;
        import lombok.Getter;
        import lombok.Setter;

        import java.math.BigDecimal;
        import java.util.ArrayList;
        import java.util.Date;
        import java.util.List;

        @Entity
        @Getter
        @Setter
        @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
        public class Product {
            @Id
            @GeneratedValue(strategy = GenerationType.IDENTITY)
            private Long id;

            @Column(nullable = false)
            private boolean isActive;

            @Column(nullable = false)
            private String name;

            private String description;

            @Column(nullable = false, precision = 10, scale = 2)
            private BigDecimal price;

            private String category;
            private String brand;
            private String imageUrl;
            private Float rating;

            @Temporal(TemporalType.TIMESTAMP)
            @Column(updatable = false)
            @org.hibernate.annotations.CreationTimestamp
            private Date createdAt;

            @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
            private List<ProductVariation> variations = new ArrayList<>();

            @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
            private List<Review> reviews = new ArrayList<>();
        }