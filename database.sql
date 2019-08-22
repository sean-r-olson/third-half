
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "admin_level" int, 
    "team" int references "players",
    "team_name" varchar 
    );

CREATE TABLE "players" (
    "id" SERIAL PRIMARY KEY,
	"user_id" int references "user",
	"player_name" varchar (20),
	"team_id" int references "teams",
	"position" varchar,
	"picture" varchar, 
    "role" varchar, 
    "team_logo" varchar, 
    "team_description" varchar
);

CREATE TABLE "teams" (
    "id" SERIAL PRIMARY KEY,
    "team_name" varchar,
    "city" varchar,
    "state" varchar, 
    "region" varchar, 
    "country" varchar, 
    "about_us" varchar,
    "logo" varchar, 
    "color_1" varchar, 
    "color_2" varchar, 
    "team_picture" varchar 
);

CREATE TABLE "messages" ( 
	"id" serial primary key,
	"from_id" int references "players",
	"recieved_id" int references "players",
	"date_time" timestamp,
    "message" varchar,
    "from_name" varchar,
    "recieved_name" varchar, 
    "new_message" boolean,
    "team_name" varchar 
);

CREATE TABLE "private_posts" (
	"id" serial primary key, 
	"player_id" int references "players",
	"message" varchar,
	"date_time" timestamp
);

CREATE TABLE "public_posts" (
	"id" serial primary key, 
	"team_id" int references "teams",
	"message" varchar,
	"date_time" timestamp, 
    "player_name" varchar, 
    "username" varchar,
);

CREATE TABLE "countries" (
	"id" serial primary key,
	"name_id" int references "teams",
	"flag" varchar
); 

CREATE TABLE "graphics" (
	"id" serial primary key,
	"image" varchar
);

INSERT INTO "teams" ("team_name", "city", "state", "region", "country", "about_us", "logo")
VALUES 
('Minneapolis Mayhem', 'Minneapolis', 'Minnesota', 'Midwest', 'USA', 
'OUR MISSION STATEMENT: Minneapolis Mayhem Rugby Football Club is an inclusive environment where men of all backgrounds and abilities can learn and play the sport of rugby.', 
'https://static.wixstatic.com/media/b0b871_9f5f207b923f42878409a7988ae88d38~mv2.png/v1/fill/w_431,h_459,al_c,q_80,usm_0.66_1.00_0.01/48371857_936601799869875_290747228275657.webp'),
('Madison Minotaurs', 'Madison', 'Wisconsin', 'Midwest', 'USA', 
'Inclusive mens rugby team based in Madison, Wisconsin', 'https://i0.wp.com/rugbymadison.org/wp-content/uploads/2017/08/minotaurs_logo.png?zoom=2&resize=211%2C226');

INSERT INTO "players" ("player_name", "team_id", "position",  "picture", "role")
VALUES 
('Adam Toninato', 1, 'Wing', 'https://static.wixstatic.com/media/b0b871_72b797c9a7094dd0a9c72efae9344eb4~mv2_d_2461_3219_s_4_2.jpg/v1/fill/w_2461,h_3219/IMG_1025%20(1).jpg', 'back'), 
('Kurtis Elmberg', 1, 'Lock', 'https://static.wixstatic.com/media/b0b871_063ccff9a11d4938941e753aff022fbe~mv2_d_3024_4032_s_4_2.jpg/v1/fill/w_3024,h_4032/IMG_1030.jpg', 'forward'), 
('Ed Cobos', 1, 'Flanker', 'https://static.wixstatic.com/media/b0b871_2595cac534d941a8b42afd7aa25f4086~mv2_d_3024_4032_s_4_2.jpg/v1/fill/w_3024,h_4032/IMG_0976.jpg', 'forward'), 
('Terrance Easley', 1, '8-man', 'https://static.wixstatic.com/media/b0b871_4261ba576506467d9bb1c98b8ce8ca09~mv2_d_3024_4032_s_4_2.jpg/v1/fill/w_3024,h_4032/IMG_0971.jpg', 'forward'), 
('Terrance Easley', 1, '8-man', 'https://static.wixstatic.com/media/b0b871_4261ba576506467d9bb1c98b8ce8ca09~mv2_d_3024_4032_s_4_2.jpg/v1/fill/w_3024,h_4032/IMG_0971.jpg', 'forward'), 
('Raymond Robinson', 1, 'Prop', 'https://static.wixstatic.com/media/b0b871_54fdaf707a0f4174ad8f3ffd40f3f5f1~mv2_d_3024_4032_s_4_2.jpg/v1/fill/w_3024,h_4032/IMG_0962.jpg', 'forward'), 
('Jesse Stonehouse', 1, 'Prop', 'https://static.wixstatic.com/media/b0b871_00bc5355da194a38be3a8425b5cc1ade~mv2_d_3024_4032_s_4_2.jpg/v1/fill/w_3024,h_4032/IMG_0964.jpg', 'forward'), 
('Ed Connolly', 1, 'Fullback', 'https://static.wixstatic.com/media/b0b871_21cbf701ab08423c903510111096a1e3~mv2_d_3024_4032_s_4_2.jpg/v1/fill/w_3024,h_4032/IMG_0958.jpg', 'back'), 
('Cedric Smith', 1, 'Scrumhalf', 'https://static.wixstatic.com/media/b0b871_dfef2de5d3cc47e1992a32640fa3b0b3~mv2_d_3024_4032_s_4_2.jpg/v1/fill/w_3024,h_4032/IMG_0954.jpg', 'coach'), 
('Jacob Sandberg', 1, 'Prop', 'https://static.wixstatic.com/media/b0b871_077c022012bd450db130a3c33e83cf18~mv2_d_3024_4032_s_4_2.jpg/v1/fill/w_3024,h_4032/IMG_0956.jpg', 'coach'), 
('James Ryan', 1, 'Wing', 'https://static.wixstatic.com/media/b0b871_5a5eecb6bc344f7e84ce7a5ac8772b5f~mv2_d_3024_4032_s_4_2.jpg/v1/fill/w_3024,h_4032/IMG_0955.jpg', 'back');

INSERT INTO "players" ("player_name", "team_id", "position", "picture", "role")
VALUES 
('Tim Tousey', 2, 'Wing', 'https://scontent-msp1-1.xx.fbcdn.net/v/t1.0-9/32682502_10211424237062110_5236767896465571840_n.jpg?_nc_cat=104&_nc_oc=AQmWkngnYcFWfcGKUGvuHb-aY1TkHDs1io3Su4OYDkODXXBdu2_sbbMRq4AHlIVoQBI&_nc_ht=scontent-msp1-1.xx&oh=01edf45f6f71a259a0b372639fd39a50&oe=5E15FE85', 'back'),
('Drew Briski', 2, 'Flyhalf', 'https://scontent-msp1-1.xx.fbcdn.net/v/t1.0-9/60781587_10156689510749825_8793010455460184064_n.jpg?_nc_cat=106&_nc_oc=AQnGPBBJkehAeaxzgjovX74bUd-ExF7W3VDMwslNtCboI6C9pAodKRXfhE2Dpu540Mk&_nc_ht=scontent-msp1-1.xx&oh=c91dfbef9688f102d8eb1f169015efa4&oe=5DD6F360', 'coach'),
('Phillip Vinson', 2, 'Prop', 'https://scontent-msp1-1.xx.fbcdn.net/v/t1.0-9/33025903_10155930471918292_7186708397746552832_n.jpg?_nc_cat=109&_nc_oc=AQlWVIQiW1nNXB_BM3hJBp41DzZNmRPpSb0iUu1L7RRccg4MUgEfCA5iKcCrcVe5fY8&_nc_ht=scontent-msp1-1.xx&oh=814c7149830fdae74caded29a864d3af&oe=5DD978FE', 'forward'),
('Leroy Williams', 2, '8-man', 'https://scontent-msp1-1.xx.fbcdn.net/v/t1.0-9/56162844_2692751884074068_4155185948969140224_n.jpg?_nc_cat=105&_nc_oc=AQnN-W4mkUKAb7zdysYDqHl2Zk2dec-0jDyng2BSiE4OQsqDkRQjhDozhKhAK4aqQ-w&_nc_ht=scontent-msp1-1.xx&oh=5c77aa3fa3790dd387496b10f9d4dad0&oe=5DDA2ABD', 'forward'),
('Eric Fabian', 2, 'Prop', 'https://scontent-msp1-1.xx.fbcdn.net/v/t1.0-9/56835725_10155904807191556_3966804813601046528_o.jpg?_nc_cat=102&_nc_oc=AQlVdMcYTYvel9emecubWsU6HobSfLI-qBPhCOJtOc5rciAM72OrgG2WtaCtJfQbt6Y&_nc_ht=scontent-msp1-1.xx&oh=7c9eeaf4b37c89f12d884c3d1aaa8d89&oe=5DE47830', 'forward'),
('Chris Egger', 2, 'Outside Center', 'https://scontent-msp1-1.xx.fbcdn.net/v/t1.0-9/44897524_10155588150606556_1827465651954909184_o.jpg?_nc_cat=101&_nc_oc=AQk9tYxbbhon4ucvgFL5S3nuy8FgbvuEX-_Ccjdx7E_v2GDWc1EVTyRpGe0eHQdsx_E&_nc_ht=scontent-msp1-1.xx&oh=e638dd5f1ff643e0451c700ca4a9390d&oe=5DE48888', 'back');
