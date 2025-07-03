package com.mraphael.CallOfSweets.Entities;

        import com.fasterxml.jackson.annotation.JsonIdentityInfo;
        import com.fasterxml.jackson.annotation.ObjectIdGenerators;
        import jakarta.persistence.*;
        import lombok.*;
        import org.hibernate.annotations.CreationTimestamp;

        import java.util.ArrayList;
        import java.util.Date;
        import java.util.List;

        @Entity
        @Getter
        @Setter
        @NoArgsConstructor
        @AllArgsConstructor
        @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
        public class User {

            @Id
            @GeneratedValue(strategy = GenerationType.IDENTITY)
            private Long id;

            @Column(nullable = false, length = 100)
            private String name;

            @Column(nullable = false, unique = true, length = 100)
            private String email;

            @Column(nullable = false)
            private String password;

            @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
            private List<Address> addresses = new ArrayList<>();

            @Column(length = 20)
            private String phone;

            @Temporal(TemporalType.DATE)
            private Date birthday;

            @Enumerated(EnumType.STRING)
            @Column(nullable = false, length = 20)
            private UserRole role;

            @CreationTimestamp
            @Temporal(TemporalType.TIMESTAMP)
            @Column(updatable = false)
            private Date createdAt;

            @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
            private List<Order> orders = new ArrayList<>();

            @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
            private Cart cart;

            public User(String name, String email, String password, UserRole role) {
                this.name = name;
                this.email = email;
                this.password = password;
                this.role = role;
            }

            public User(String name, String email, String password, String phone, Date birthday, UserRole role) {
                this.name = name;
                this.email = email;
                this.password = password;
                this.phone = phone;
                this.birthday = birthday;
                this.role = role;
            }
        }