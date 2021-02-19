drop database if exists covid_customs_test;
create database covid_customs_test;
use covid_customs_test;

create table mask (
	mask_id int primary key auto_increment,
    material varchar(50) not null,
    style varchar(50) not null,
    cost decimal(10,2) not null,
    is_custom boolean not null,
    image_link varchar(100) not null,
    is_deleted boolean not null
);

create table color (
	mask_id int not null,
	color_id int not null,
	color_name varchar(50) not null,
    constraint fk_mask_id
		foreign key (mask_id)
        references mask(mask_id),
	constraint uq_mask_id_color_id
		unique (mask_id, color_id)
);

create table customer (
	customer_id int primary key auto_increment,
    first_name varchar(50) not null,
    last_name varchar(50) not null,
    email varchar(50) not null,
    phone varchar(50) not null,
    address varchar(100) not null,
    user_role varchar(50) not null,
    constraint uq_email
		unique (email)
);

create table orders (
	order_id int primary key auto_increment,
    customer_id int not null,
    purchased boolean not null,
    purchase_date date,
    constraint fk_customer_id
		foreign key (customer_id)
        references customer(customer_id)
);

create table order_mask (
	order_id int not null,
    mask_id int not null,
    quantity int not null,
    constraint fk_order_id
		foreign key (order_id)
        references orders(order_id),
	constraint fk_mask_id_orders
		foreign key (mask_id)
        references mask(mask_id),
	constraint uq_order_id_mask_id
		unique (order_id, mask_id)
);


create table user_account (
	customer_id int not null,
	username varchar(50) not null,
    user_password varchar(500) not null,
    constraint fk_user_account_customer_id
		foreign key (customer_id)
        references customer(customer_id),
	constraint uq_username_password
		unique (username, user_password)
);

    
delimiter //
create procedure set_known_good_state()
begin

	delete from color;
    alter table color auto_increment = 1;
    
	delete from order_mask;
    delete from user_account;
    
    delete from orders;
    alter table orders auto_increment = 1;
    
	delete from mask;
    alter table mask auto_increment = 1;
    
    delete from customer;
    alter table customer auto_increment = 1;
    
   
	
    insert into mask values
    ( 1, "cotton", "athletic", 11.10, false, "imageURL-1", false),
    ( 2, "cotton", "athletic", 2.01, false, "imageURL-2", false),
    ( 3, "cotton", "athletic", 20.00, false, "imageURL-3", false),
    ( 4, "cotton", "athletic", 50.00, false, "imageURL-4", true);
    
    insert into color values
    ( 1, 1, "blue"),
    ( 1, 2, "green"),
    ( 1, 3, "red"),
    ( 2, 1, "blue"),
    ( 2, 3, "red"),
    ( 3, 2, "green");
    
    insert into customer values
	(1, "Austin", "Shinnick", "austin@aol.com","763-464-6002","827 413rd Ave NW", "ADMIN"),
    (2, "SythJacob", "Rosenbaum", "jacob@yahoo.com","111-111-1111","that's no moon...", "USER"),
    (3, "Kendra", "Krosch", "kk@covidCustoms.com", "222-222-2222", "Colorful Colorado", "USER");
    
    insert into orders values
    ( 1, 1, false, null),
    ( 2, 2, true, "2020-02-12"),
    ( 3, 3, true, "2020-02-15"),
    ( 4, 3, false, null);
    
    insert into order_mask values
    ( 1, 1, 3),
    ( 2, 1, 3),
    ( 2, 2, 4),
    ( 3, 3, 1),
    ( 4, 1, 2),
    ( 4, 2, 3),
    ( 4, 3, 1); -- add duplicate row and test what happens here
    
    insert into user_account values
    (1,"austin@aol.com", "password"),
    (2,"jacob@yahoo.com", "password"),
    (3,"kk@covidCustoms.com", "password");

end //
-- 4. Change the statement terminator back to the original.
delimiter ;

SET SQL_SAFE_UPDATES = 0;
call set_known_good_state();
SET SQL_SAFE_UPDATES = 1;

select * from customer;
select * from user_account;




-- sql query for customer model

select
	c.customer_id,
    c.first_name,
    c.last_name,
    c.email,
    ua.user_password,
    c.address,
    c.phone,
    c.user_role
from customer c
inner join user_account ua on c.customer_id = ua.customer_id
where c.customer_id = 1;


-- sql query for mask model less color list
select
	m.mask_id,
    m.material,
    m.style,
    m.cost,
    m.is_custom,
    m.image_link,
    m.is_deleted
from mask m;

-- sql query for mask "color list"
select * from color
where mask_id = 2; -- the mask_id will need to be a variable in java


-- sql query for order "total cost"
select
	o.order_id,
    c.email,
	sum(om.quantity*m.cost) as Total,
    o.purchased,
    o.purchase_date
from orders o
inner join customer c on o.customer_id = c.customer_id
inner join order_mask om on o.order_id = om.order_id
inner join mask m on om.mask_id = m.mask_id
group by order_id;

-- sql query for order "mask list"
select * from order_mask om
-- inner join mask m on om.mask_id = m.mask_id
where order_id = 1; -- the number will need to be a variable in java
    
    
select
	o.order_id,
	c.customer_id, 
	sum(om.quantity*m.cost) as total, 
	o.purchased, 
	o.purchase_date 
from orders o 
inner join customer c on o.customer_id = c.customer_id 
inner join order_mask om on o.order_id = om.order_id 
inner join mask m on om.mask_id = m.mask_id 
-- where o.customer_id = 3
group by order_id;


