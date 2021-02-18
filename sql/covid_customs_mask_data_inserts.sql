
use covid_customs;

set sql_safe_updates = 0;
delete from color;
delete from order_mask;
delete from mask;
set sql_safe_updates = 1;

    insert into mask values
    ( 1, "50% polyester and 50% cotton", "Over the Ear", 10.00, false, "/images/mask_blue_polycot_ear.png"),
    ( 2, "Polyester", "Wrap", 13.00, false, "/images/mask_blue_white_polyester_wrap.jpg"),
    ( 3, "50% polyester and 50% cotton", "Over the Ear", 10.00, false, "/images/mask_black_polycot_ear.png"),
    ( 4, "Polyester", "Wrap", 13.00, false, "/images/mask_green_black_polyester_wrap.jpg"),
    ( 5, "50% polyester and 50% cotton", "Over the Ear", 10.00, false, "/images/mask_purple_white_black_polycot_ear.webp"),
	( 6, "Cotton", "Athletic", 11.00, false, "/images/mask_orange_cotton_athletic.jpg"),
    ( 7, "Cotton", "Athletic", 11.00, false, "/images/mask_white_cotton_athletic.jpg"),
	( 8, "Cotton", "Athletic", 11.00, false, "/images/mask_red_cotton_athletic.jpg"),
	( 9, "Polyester", "Wrap", 13.00, false, "/images/mask_red_white_blue_polyester_wrap.jpg");
    
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