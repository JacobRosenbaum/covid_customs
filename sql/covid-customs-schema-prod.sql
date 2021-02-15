drop database if exists covid_customs;
create database covid_customs;
use covid_customs;

create table customer (
	customer_id int primary key auto_increment,
    first_name varchar(50) not null,
    last_name varchar(50) not null,
    email varchar(50) not null,
    phone varchar(50) not null,
    address varchar(100) not null,
    constraint uq_email
		unique (email)
);

insert into customer values
	(1, "Austin", "Shinnick", "test@test.com","763-464-6002","827 413rd Ave NW"),
    (2, "Austin", "Shinnick", "test@test.org","763-464-6002","827 413rd Ave NW");
    
select * from customer;

create table user_account (
	username varchar(50) not null,
    user_password varchar(100) not null,
    constraint fk_user_account_username
		foreign key (username)
        references customer(email)
);

create table customer_order (
	order_id int primary key auto_increment,
    customer_id int not null,
    total_cost decimal(10,2) not null, -- NEED JOINS HERE!!!!!!!!!!!!!!!!!!!!!!!!!!!
    purchased boolean not null,
    purchase_date date not null,
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
        references customer_order(order_id),
	constraint fk_mask_id
		foreign key (mask_id)
        references mask(mask_id)
);

create table mask (
	mask_id int primary key auto_increment,
    material varchar(50) not null,
    style varchar(50) not null,
    cost decimal(10,2) not null,
    is_custom boolean not null,
    image_link varchar(100) not null
);

create table color (
	
);
