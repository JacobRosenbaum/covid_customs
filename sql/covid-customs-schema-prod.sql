drop database if exists covid_customs;
create database covid_customs;
use covid_customs;

create table mask (
	mask_id int primary key auto_increment,
    material varchar(50) not null,
    style varchar(50) not null,
    cost decimal(10,2) not null,
    is_custom boolean not null,
    image_link varchar(100) not null
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
	username varchar(50) not null,
    user_password varchar(500) not null,
    constraint fk_user_account_username
		foreign key (username)
        references customer(email),
	constraint uq_username_password
		unique (username, user_password)
);





