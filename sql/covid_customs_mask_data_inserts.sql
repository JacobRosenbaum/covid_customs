
use covid_customs;

set sql_safe_updates = 0;
delete from color;
delete from order_mask;
delete from orders;
delete from mask;
delete from user_account;
delete from customer;
set sql_safe_updates = 1;

    insert into mask values
    ( 1, "50% polyester and 50% cotton", "Over the Ear", 10.00, false, "/images/mask_blue_polycot_ear.png", false),
    ( 3, "Polyester", "Wrap", 13.00, false, "/images/mask_blue_white_polyester_wrap.png", false),
    ( 17, "50% polyester and 50% cotton", "Over the Ear", 10.00, false, "/images/mask_black_polycot_ear.png", true),
    ( 4, "Polyester", "Wrap", 13.00, false, "/images/mask_green_black_polyester_wrap.png", false),
    ( 5, "50% polyester and 50% cotton", "Over the Ear", 10.00, false, "/images/mask_purple_white_black_polycot_ear.png", false),
	( 6, "Cotton", "Athletic", 11.00, false, "/images/mask_orange_cotton_athletic.png", false),
    ( 7, "Cotton", "Athletic", 11.00, false, "/images/mask_white_cotton_athletic.png", false),
	( 8, "Cotton", "Athletic", 11.00, false, "/images/mask_red_cotton_athletic.png", false),
	( 10, "Polyester", "Wrap", 13.00, false, "/images/mask_red_white_blue_polyester_wrap.png", false),
    ( 2, "Cotton", "Over the Ear", 11.50, false, "/images/mask_covid_red_cot_ear.png", false),
    ( 11, "Cotton", "Over the Ear", 11.50, false, "/images/mask_covid_white_cot_ear.png", true),
	( 12, "Cotton", "Over the Ear", 13.50, false, "/images/mask_greenfunk_black_cot_ear.png", false),
	( 13, "Cotton", "Over the Ear", 13.50, false, "/images/mask_greenfunk_green_cot_ear.png", true),
    ( 14, "Cotton", "Over the Ear", 13.50, false, "/images/mask_greenfunk_pink_cot_ear.png", true),
    ( 22, "Cotton", "Over the Ear", 12.50, false, "/images/mask_polka_orange_cot_ear.png", false),
	( 16, "Cotton", "Over the Ear", 12.50, false, "/images/mask_polka_yellow_cot_ear.png", true),
    ( 9, "Cotton", "Over the Ear", 12.50, false, "/images/mask_polka_purple_cot_ear.png", false),
	( 18, "Cotton", "Over the Ear", 13.50, false, "/images/mask_squares_blue_cot_ear.png", false),
    ( 19, "Cotton", "Over the Ear", 13.50, false, "/images/mask_squares_red_cot_ear.png", true),
    ( 20, "Cotton", "Over the Ear", 12.50, false, "/images/mask_stripes_black_cot_ear.png", false),
	( 21, "Cotton", "Over the Ear", 12.50, false, "/images/mask_stripes_yellow_cot_ear.png", false),
    ( 15, "Cotton", "Over the Ear", 12.50, false, "/images/mask_stripes_white_cot_ear.png", true);
    
    insert into color values
    ( 1, 5, "Blue"),
    ( 2, 5, "Blue"), ( 2, 8, "White"),
    ( 3, 9, "Black"),
    ( 4, 9, "Black"), ( 4, 4, "Green"),
    ( 5, 7, "Violet"), ( 5, 8, "White"), ( 5, 9, "Black"),
    ( 6, 2, "Orange"),
    ( 7, 8, "White"),
    ( 8, 1, "Red"), 
    ( 9, 1, "Red"), ( 9, 5, "Blue"), ( 9, 8, "White"),
    ( 10, 1, "Red"), ( 10, 5, "Blue"),
	( 11, 1, "Red"), ( 11, 5, "Blue"), ( 11, 8, "White"),
    ( 12, 9, "Black"), ( 12, 4, "Green"),
    ( 13, 9, "Black"), ( 13, 4, "Green"),
    ( 14, 9, "Black"), ( 14, 4, "Green"), (14, 1, "Red"),
    ( 15, 7, "Violet"), ( 15, 2, "Orange"), (15, 1, "Red"),
    ( 16, 7, "Violet"), ( 16, 2, "Orange"), (16, 1, "Red"),
    ( 17, 7, "Violet"), ( 17, 2, "Orange"), (17, 1, "Red"),
    ( 18, 1, "Red"), ( 18, 5, "Blue"),
    ( 19, 1, "Red"), ( 19, 5, "Blue"),
    ( 20, 2, "Orange"),  ( 20, 9, "Black"),
    ( 21, 2, "Orange"), 
    ( 22, 2, "Orange"), ( 22, 8, "White");

    --   added below for testing purposes ---------------------------------------------------------------------------------------------------------------------------------

    
	insert into customer values
	(1, "Austin", "Shinnick", "austin@aol.com","763-464-6002","827 413rd Ave NW","andover","MN",55304, "USER"),
    (2, "SythJacob", "Rosenbaum", "jacob@yahoo.com","111-111-1111","that's no moon...","andover","MN",55304, "USER"),
    (3, "Kendra", "Krosch", "kk@covidCustoms.com", "222-222-2222", "Colorful Colorado","andover","MN",55304, "USER"),
    (4, "Admin", "Admin", "admin@admin.com", "555-555-5555", "123 Lane", "Minneapolis", "MN", 55414, "ADMIN");
    select * from customer;
    
    insert into orders values
    ( 1, 1, false, null),
    ( 2, 2, true, "2020-02-12"),
    ( 3, 2, true, "2020-02-15"),
    ( 4, 3, false, null);
    
    insert into order_mask values
    ( 1, 1, 3),
    ( 1, 5, 3),
    ( 1, 6, 3),
    ( 1, 7, 3),
    ( 2, 2, 3),
    ( 2, 3, 4),
    ( 3, 4, 1),
    ( 3, 9, 1),
    ( 4, 5, 2),
    ( 4, 6, 3),
    ( 4, 4, 1);
   
   insert into user_account values
   (1, "austin@aol.com", "$2a$10$1R0dwNymy05UyET3Dr7DMuSgl4X.dFwbQVZkw7xKiTT98VWDl5lk2"),
   (2, "jacob@yahoo.com", "$2a$10$1R0dwNymy05UyET3Dr7DMuSgl4X.dFwbQVZkw7xKiTT98VWDl5lk2"),
   (3,  "kk@covidCustoms.com", "$2a$10$1R0dwNymy05UyET3Dr7DMuSgl4X.dFwbQVZkw7xKiTT98VWDl5lk2"),
     (4, 'admin@admin.com', "$2a$10$1R0dwNymy05UyET3Dr7DMuSgl4X.dFwbQVZkw7xKiTT98VWDl5lk2");
     
     
select
	c.customer_id,
    c.first_name,
    c.last_name,
    c.email,
    ua.user_password,
    c.address_line,
    c.city,
    c.state,
    c.zip_code,
    c.phone,
    c.user_role
from customer c
inner join user_account ua on c.customer_id = ua.customer_id;

select * from customer;
select * from order_mask;



