insert into "members" (address, nickname) values ('0x288fB136C9291a4b62f1620bEE5901BEB2B0ffD7', 'admin jaewook');

insert into authority (authority_name) values ('ROLE_USER');
insert into authority (authority_name) values ('ROLE_ADMIN');

insert into user_authority (user_id, authority_name) values (1, 'ROLE_USER');
insert into user_authority (user_id, authority_name) values (1, 'ROLE_ADMIN');