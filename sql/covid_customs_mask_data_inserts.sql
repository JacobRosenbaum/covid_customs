
use covid_customs;

set sql_safe_updates = 0;
delete from color;
delete from order_mask;
delete from mask;
delete from user_account;
delete from customer;
set sql_safe_updates = 1;

    insert into mask values
    ( 1, "50% polyester and 50% cotton", "Over the Ear", 10.00, false, "/images/mask_blue_polycot_ear.png", false),
    ( 2, "Polyester", "Wrap", 13.00, false, "/images/mask_blue_white_polyester_wrap.jpg", false),
    ( 3, "50% polyester and 50% cotton", "Over the Ear", 10.00, false, "/images/mask_black_polycot_ear.png", false),
    ( 4, "Polyester", "Wrap", 13.00, false, "/images/mask_green_black_polyester_wrap.jpg", false),
    ( 5, "50% polyester and 50% cotton", "Over the Ear", 10.00, false, "/images/mask_purple_white_black_polycot_ear.webp", false),
	( 6, "Cotton", "Athletic", 11.00, false, "/images/mask_orange_cotton_athletic.jpg", false),
    ( 7, "Cotton", "Athletic", 11.00, false, "/images/mask_white_cotton_athletic.jpg", false),
	( 8, "Cotton", "Athletic", 11.00, false, "/images/mask_red_cotton_athletic.jpg", false),
	( 9, "Polyester", "Wrap", 13.00, false, "/images/mask_red_white_blue_polyester_wrap.jpg", false);
    
    insert into color values
    ( 1, 5, "Blue"),
    ( 2, 5, "Blue"),
    ( 2, 8, "White"),
    ( 3, 9, "Black"),
    ( 4, 9, "Black"),
    ( 4, 4, "Green"),
    ( 5, 7, "Violet"),
    ( 5, 8, "White"),
    ( 5, 9, "Black"),
    ( 6, 2, "Orange"),
    ( 7, 8, "White"),
    ( 8, 1, "Red"),
    ( 9, 1, "Red"),
    ( 9, 5, "Blue"),
    ( 9, 8, "White");
    
--     insert into customer values
-- 	(1, "Austin", "Shinnick", "austin@aol.com","763-464-6002","827 413rd Ave NW", "Minneapolis", "MN", 55414, "ADMIN"),
--     (2, "SythJacob", "Rosenbaum", "jacob@yahoo.com","111-111-1111","that's no moon...", "Minneapolis", "MN", 55414, "USER"),
--     (3, "Kendra", "Krosch", "kk@covidCustoms.com", "222-222-2222", "Colorful Colorado", "Minneapolis", "MN", 55414, "USER");
--     
-- insert into user_account values
--     (1,"austin@aol.com", "password"),
--     (2,"jacob@yahoo.com", "password"),
--     (3,"kk@covidCustoms.com", "password");
--     
--     insert into orders values
--     ( 1, 1, false, null),
--     ( 2, 2, true, "2020-02-12"),
--     ( 3, 3, true, "2020-02-15"),
--     ( 4, 3, false, null);
--     
--     insert into order_mask values
--     ( 1, 1, 3),
--     ( 2, 1, 3),
--     ( 2, 2, 4),
--     ( 3, 3, 1),
--     ( 4, 1, 2),
--     ( 4, 2, 3),
--     ( 4, 3, 1); 
    