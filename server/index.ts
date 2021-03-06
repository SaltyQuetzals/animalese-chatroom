import socketIO from 'socket.io';
import express from 'express';
import http from 'http';

const villagers = [
  { name: 'Admiral', file: 'Admiral' },
  { name: 'Agent S', file: 'Agent_S' },
  { name: 'Agnes', file: 'Agnes' },
  { name: 'Al', file: 'Al' },
  { name: 'Alfonso', file: 'Alfonso' },
  { name: 'Alice', file: 'Alice' },
  { name: 'Alli', file: 'Alli' },
  { name: 'Amelia', file: 'Amelia' },
  { name: 'Anabelle', file: 'Anabelle' },
  { name: 'Anchovy', file: 'Anchovy' },
  { name: 'Ankha', file: 'Ankha' },
  { name: 'Angus', file: 'Angus' },
  { name: 'Anicotti', file: 'Anicotti' },
  { name: 'Annalisa', file: 'Annalisa' },
  { name: 'Annalise', file: 'Annalise' },
  { name: 'Antonio', file: 'Antonio' },
  { name: 'Apollo', file: 'Apollo' },
  { name: 'Apple', file: 'Apple' },
  { name: 'Astrid', file: 'Astrid' },
  { name: 'Audie', file: 'Audie' },
  { name: 'Aurora', file: 'Aurora' },
  { name: 'Ava', file: 'Ava' },
  { name: 'Avery', file: 'Avery' },
  { name: 'Axel', file: 'Axel' },
  { name: 'Baabara', file: 'Baabara' },
  { name: 'Bam', file: 'Bam' },
  { name: 'Bangle', file: 'Bangle' },
  { name: 'Barold', file: 'Barold' },
  { name: 'Bea', file: 'Bea' },
  { name: 'Beardo', file: 'Beardo' },
  { name: 'Beau', file: 'Beau' },
  { name: 'Becky', file: 'Becky' },
  { name: 'Bella', file: 'Bella' },
  { name: 'Benedict', file: 'Benedict' },
  { name: 'Benjamin', file: 'Benjamin' },
  { name: 'Bertha', file: 'Bertha' },
  { name: 'Bettina', file: 'Bettina' },
  { name: 'Bianca', file: 'Bianca' },
  { name: 'Biff', file: 'Biff' },
  { name: 'Big Top', file: 'Big_Top' },
  { name: 'Bill', file: 'Bill' },
  { name: 'Billy', file: 'Billy' },
  { name: 'Biskit', file: 'Biskit' },
  { name: 'Bitty', file: 'Bitty' },
  { name: 'Blaire', file: 'Blaire' },
  { name: 'Blanche', file: 'Blanche' },
  { name: 'Bluebear', file: 'Bluebear' },
  { name: 'Bob', file: 'Bob' },
  { name: 'Bonbon', file: 'Bonbon' },
  { name: 'Bones', file: 'Bones' },
  { name: 'Boomer', file: 'Boomer' },
  { name: 'Boone', file: 'Boone' },
  { name: 'Boots', file: 'Boots' },
  { name: 'Boris', file: 'Boris' },
  { name: 'Boyd', file: 'Boyd' },
  { name: 'Bree', file: 'Bree' },
  { name: 'Broccolo', file: 'Broccolo' },
  { name: 'Broffina', file: 'Broffina' },
  { name: 'Bruce', file: 'Bruce' },
  { name: 'Bubbles', file: 'Bubbles' },
  { name: 'Buck', file: 'Buck' },
  { name: 'Bud', file: 'Bud' },
  { name: 'Bunnie', file: 'Bunnie' },
  { name: 'Butch', file: 'Butch' },
  { name: 'Buzz', file: 'Buzz' },
  { name: 'Cally', file: 'Cally' },
  { name: 'Camofrog', file: 'Camofrog' },
  { name: 'Canberra', file: 'Canberra' },
  { name: 'Candi', file: 'Candi' },
  { name: 'Carmen', file: 'Carmen' },
  { name: 'Caroline', file: 'Caroline' },
  { name: 'Carrie', file: 'Carrie' },
  { name: 'Cashmere', file: 'Cashmere' },
  { name: 'Celia', file: 'Celia' },
  { name: 'Cesar', file: 'Cesar' },
  { name: 'Chadder', file: 'Chadder' },
  { name: 'Charlise', file: 'Charlise' },
  { name: 'Cheri', file: 'Cheri' },
  { name: 'Cherry', file: 'Cherry' },
  { name: 'Chester', file: 'Chester' },
  { name: 'Chevre', file: 'Chevre' },
  { name: 'Chief', file: 'Chief' },
  { name: 'Chops', file: 'Chops' },
  { name: 'Chow', file: 'Chow' },
  { name: 'Chrissy', file: 'Chrissy' },
  { name: 'Claude', file: 'Claude' },
  { name: 'Claudia', file: 'Claudia' },
  { name: 'Clay', file: 'Clay' },
  { name: 'Cleo', file: 'Cleo' },
  { name: 'Clyde', file: 'Clyde' },
  { name: 'Coach', file: 'Coach' },
  { name: 'Cobb', file: 'Cobb' },
  { name: 'Coco', file: 'Coco' },
  { name: 'Cole', file: 'Cole' },
  { name: 'Colton', file: 'Colton' },
  { name: 'Cookie', file: 'Cookie' },
  { name: 'Cousteau', file: 'Cousteau' },
  { name: 'Cranston', file: 'Cranston' },
  { name: 'Croque', file: 'Croque' },
  { name: 'Cube', file: 'Cube' },
  { name: 'Curlos', file: 'Curlos' },
  { name: 'Curly', file: 'Curly' },
  { name: 'Curt', file: 'Curt' },
  { name: 'Cyd', file: 'Cyd' },
  { name: 'Cyrano', file: 'Cyrano' },
  { name: 'Daisy', file: 'Daisy' },
  { name: 'Deena', file: 'Deena' },
  { name: 'Deirdre', file: 'Deirdre' },
  { name: 'Del', file: 'Del' },
  { name: 'Deli', file: 'Deli' },
  { name: 'Derwin', file: 'Derwin' },
  { name: 'Diana', file: 'Diana' },
  { name: 'Diva', file: 'Diva' },
  { name: 'Dizzy', file: 'Dizzy' },
  { name: 'Dobie', file: 'Dobie' },
  { name: 'Doc', file: 'Doc' },
  { name: 'Dom', file: 'Dom' },
  { name: 'Dora', file: 'Dora' },
  { name: 'Dotty', file: 'Dotty' },
  { name: 'Drago', file: 'Drago' },
  { name: 'Drake', file: 'Drake' },
  { name: 'Drift', file: 'Drift' },
  { name: 'Ed', file: 'Ed' },
  { name: 'Egbert', file: 'Egbert' },
  { name: 'Elise', file: 'Elise' },
  { name: 'Ellie', file: 'Ellie' },
  { name: 'Elmer', file: 'Elmer' },
  { name: 'Eloise', file: 'Eloise' },
  { name: 'Elvis', file: 'Elvis' },
  { name: 'Erik', file: 'Erik' },
  { name: 'Eunice', file: 'Eunice' },
  { name: 'Eugene', file: 'Eugene' },
  { name: 'Fang', file: 'Fang' },
  { name: 'Fauna', file: 'Fauna' },
  { name: 'Felicity', file: 'Felicity' },
  { name: 'Filbert', file: 'Filbert' },
  { name: 'Flip', file: 'Flip' },
  { name: 'Flo', file: 'Flo' },
  { name: 'Flora', file: 'Flora' },
  { name: 'Flurry', file: 'Flurry' },
  { name: 'Francine', file: 'Francine' },
  { name: 'Frank', file: 'Frank' },
  { name: 'Freckles', file: 'Freckles' },
  { name: 'Freya', file: 'Freya' },
  { name: 'Friga', file: 'Friga' },
  { name: 'Frita', file: 'Frita' },
  { name: 'Frobert', file: 'Frobert' },
  { name: 'Fuchsia', file: 'Fuchsia' },
  { name: 'Gabi', file: 'Gabi' },
  { name: 'Gala', file: 'Gala' },
  { name: 'Gaston', file: 'Gaston' },
  { name: 'Gayle', file: 'Gayle' },
  { name: 'Genji', file: 'Genji' },
  { name: 'Gigi', file: 'Gigi' },
  { name: 'Gladys', file: 'Gladys' },
  { name: 'Gloria', file: 'Gloria' },
  { name: 'Goldie', file: 'Goldie' },
  { name: 'Gonzo', file: 'Gonzo' },
  { name: 'Goose', file: 'Goose' },
  { name: 'Graham', file: 'Graham' },
  { name: 'Greta', file: 'Greta' },
  { name: 'Grizzly', file: 'Grizzly' },
  { name: 'Groucho', file: 'Groucho' },
  { name: 'Gruff', file: 'Gruff' },
  { name: 'Gwen', file: 'Gwen' },
  { name: 'Hamlet', file: 'Hamlet' },
  { name: 'Hamphrey', file: 'Hamphrey' },
  { name: 'Hans', file: 'Hans' },
  { name: 'Harry', file: 'Harry' },
  { name: 'Hazel', file: 'Hazel' },
  { name: 'Henry', file: 'Henry' },
  { name: 'Hippeux', file: 'Hippeux' },
  { name: 'Hopkins', file: 'Hopkins' },
  { name: 'Hopper', file: 'Hopper' },
  { name: 'Hornsby', file: 'Hornsby' },
  { name: 'Huck', file: 'Huck' },
  { name: 'Hugh', file: 'Hugh' },
  { name: 'Iggly', file: 'Iggly' },
  { name: 'Ike', file: 'Ike' },
  { name: 'Jacob', file: 'Jacob' },
  { name: 'Jacques', file: 'Jacques' },
  { name: 'Jambette', file: 'Jambette' },
  { name: 'Jay', file: 'Jay' },
  { name: 'Jeremiah', file: 'Jeremiah' },
  { name: 'Jitters', file: 'Jitters' },
  { name: 'Joey', file: 'Joey' },
  { name: 'Judy', file: 'Judy' },
  { name: 'Julia', file: 'Julia' },
  { name: 'Julian', file: 'Julian' },
  { name: 'June', file: 'June' },
  { name: 'Kabuki', file: 'Kabuki' },
  { name: 'Katt', file: 'Katt' },
  { name: 'Keaton', file: 'Keaton' },
  { name: 'Ken', file: 'Ken' },
  { name: 'Ketchup', file: 'Ketchup' },
  { name: 'Kevin', file: 'Kevin' },
  { name: 'Kid Cat', file: 'Kid_Cat' },
  { name: 'Kidd', file: 'Kidd' },
  { name: 'Kiki', file: 'Kiki' },
  { name: 'Kitt', file: 'Kitt' },
  { name: 'Kitty', file: 'Kitty' },
  { name: 'Klaus', file: 'Klaus' },
  { name: 'Knox', file: 'Knox' },
  { name: 'Kody', file: 'Kody' },
  { name: 'Kyle', file: 'Kyle' },
  { name: 'Leonardo', file: 'Leonardo' },
  { name: 'Leopold', file: 'Leopold' },
  { name: 'Lily', file: 'Lily' },
  { name: 'Limberg', file: 'Limberg' },
  { name: 'Lionel', file: 'Lionel' },
  { name: 'Lobo', file: 'Lobo' },
  { name: 'Lolly', file: 'Lolly' },
  { name: 'Lopez', file: 'Lopez' },
  { name: 'Louie', file: 'Louie' },
  { name: 'Lucha', file: 'Lucha' },
  { name: 'Lucky', file: 'Lucky' },
  { name: 'Lucy', file: 'Lucy' },
  { name: 'Lyman', file: 'Lyman' },
  { name: 'Mac', file: 'Mac' },
  { name: 'Maddie', file: 'Maddie' },
  { name: 'Maelle', file: 'Maelle' },
  { name: 'Maggie', file: 'Maggie' },
  { name: 'Mallary', file: 'Mallary' },
  { name: 'Maple', file: 'Maple' },
  { name: 'Marcel', file: 'Marcel' },
  { name: 'Marcie', file: 'Marcie' },
  { name: 'Margie', file: 'Margie' },
  { name: 'Marina', file: 'Marina' },
  { name: 'Marshal', file: 'Marshal' },
  { name: 'Mathilda', file: 'Mathilda' },
  { name: 'Megan', file: 'Megan' },
  { name: 'Melba', file: 'Melba' },
  { name: 'Merengue', file: 'Merengue' },
  { name: 'Merry', file: 'Merry' },
  { name: 'Midge', file: 'Midge' },
  { name: 'Mint', file: 'Mint' },
  { name: 'Mira', file: 'Mira' },
  { name: 'Miranda', file: 'Miranda' },
  { name: 'Mitzi', file: 'Mitzi' },
  { name: 'Moe', file: 'Moe' },
  { name: 'Molly', file: 'Molly' },
  { name: 'Monique', file: 'Monique' },
  { name: 'Monty', file: 'Monty' },
  { name: 'Moose', file: 'Moose' },
  { name: 'Mott', file: 'Mott' },
  { name: 'Muffy', file: 'Muffy' },
  { name: 'Murphy', file: 'Murphy' },
  { name: 'Nan', file: 'Nan' },
  { name: 'Nana', file: 'Nana' },
  { name: 'Naomi', file: 'Naomi' },
  { name: 'Nate', file: 'Nate' },
  { name: 'Nibbles', file: 'Nibbles' },
  { name: 'Norma', file: 'Norma' },
  { name: 'Octavian', file: 'Octavian' },
  { name: "O'Hare", file: 'OHare' },
  { name: 'Olaf', file: 'Olaf' },
  { name: 'Olive', file: 'Olive' },
  { name: 'Olivia', file: 'Olivia' },
  { name: 'Opal', file: 'Opal' },
  { name: 'Ozzie', file: 'Ozzie' },
  { name: 'Pancetti', file: 'Pancetti' },
  { name: 'Pango', file: 'Pango' },
  { name: 'Papi', file: 'Papi' },
  { name: 'Paolo', file: 'Paolo' },
  { name: 'Pashmina', file: 'Pashmina' },
  { name: 'Pate', file: 'Pate' },
  { name: 'Patty', file: 'Patty' },
  { name: 'Paula', file: 'Paula' },
  { name: 'Peaches', file: 'Peaches' },
  { name: 'Peanut', file: 'Peanut' },
  { name: 'Pecan', file: 'Pecan' },
  { name: 'Peck', file: 'Peck' },
  { name: 'Peewee', file: 'Peewee' },
  { name: 'Peggy', file: 'Peggy' },
  { name: 'Pekoe', file: 'Pekoe' },
  { name: 'Penelope', file: 'Penelope' },
  { name: 'Phil', file: 'Phil' },
  { name: 'Phoebe', file: 'Phoebe' },
  { name: 'Pierce', file: 'Pierce' },
  { name: 'Pietro', file: 'Pietro' },
  { name: 'Pinky', file: 'Pinky' },
  { name: 'Piper', file: 'Piper' },
  { name: 'Pippy', file: 'Pippy' },
  { name: 'Plucky', file: 'Plucky' },
  { name: 'Pompom', file: 'Pompom' },
  { name: 'Poncho', file: 'Poncho' },
  { name: 'Poppy', file: 'Poppy' },
  { name: 'Portia', file: 'Portia' },
  { name: 'Prince', file: 'Prince' },
  { name: 'Puck', file: 'Puck' },
  { name: 'Puddles', file: 'Puddles' },
  { name: 'Pudge', file: 'Pudge' },
  { name: 'Punchy', file: 'Punchy' },
  { name: 'Purrl', file: 'Purrl' },
  { name: 'Queenie', file: 'Queenie' },
  { name: 'Quillson', file: 'Quillson' },
  { name: 'Raddle', file: 'Raddle' },
  { name: 'Rasher', file: 'Rasher' },
  { name: 'Raymond', file: 'Raymond' },
  { name: 'Renée', file: 'Renee' },
  { name: 'Reneigh', file: 'Reneigh' },
  { name: 'Rex', file: 'Rex' },
  { name: 'Rhonda', file: 'Rhonda' },
  { name: 'Ribbot', file: 'Ribbot' },
  { name: 'Ricky', file: 'Ricky' },
  { name: 'Rizzo', file: 'Rizzo' },
  { name: 'Roald', file: 'Roald' },
  { name: 'Robin', file: 'Robin' },
  { name: 'Rocco', file: 'Rocco' },
  { name: 'Rocket', file: 'Rocket' },
  { name: 'Rod', file: 'Rod' },
  { name: 'Rodeo', file: 'Rodeo' },
  { name: 'Rodney', file: 'Rodney' },
  { name: 'Rolf', file: 'Rolf' },
  { name: 'Rooney', file: 'Rooney' },
  { name: 'Rory', file: 'Rory' },
  { name: 'Roscoe', file: 'Roscoe' },
  { name: 'Rosie', file: 'Rosie' },
  { name: 'Rowan', file: 'Rowan' },
  { name: 'Ruby', file: 'Ruby' },
  { name: 'Rudy', file: 'Rudy' },
  { name: 'Sally', file: 'Sally' },
  { name: 'Samson', file: 'Samson' },
  { name: 'Sandy', file: 'Sandy' },
  { name: 'Savannah', file: 'Savannah' },
  { name: 'Scoot', file: 'Scoot' },
  { name: 'Shari', file: 'Shari' },
  { name: 'Sheldon', file: 'Sheldon' },
  { name: 'Shep', file: 'Shep' },
  { name: 'Sherb', file: 'Sherb' },
  { name: 'Simon', file: 'Simon' },
  { name: 'Skye', file: 'Skye' },
  { name: 'Sly', file: 'Sly' },
  { name: 'Snake', file: 'Snake' },
  { name: 'Snooty', file: 'Snooty' },
  { name: 'Soleil', file: 'Soleil' },
  { name: 'Sparro', file: 'Sparro' },
  { name: 'Spike', file: 'Spike' },
  { name: 'Spork', file: 'Spork' },
  { name: 'Sprinkle', file: 'Sprinkle' },
  { name: 'Sprocket', file: 'Sprocket' },
  { name: 'Static', file: 'Static' },
  { name: 'Stella', file: 'Stella' },
  { name: 'Sterling', file: 'Sterling' },
  { name: 'Stinky', file: 'Stinky' },
  { name: 'Stitches', file: 'Stitches' },
  { name: 'Stu', file: 'Stu' },
  { name: 'Sydney', file: 'Sydney' },
  { name: 'Sylvana', file: 'Sylvana' },
  { name: 'Sylvia', file: 'Sylvia' },
  { name: 'Tabby', file: 'Tabby' },
  { name: 'Tad', file: 'Tad' },
  { name: 'Tammi', file: 'Tammi' },
  { name: 'Tammy', file: 'Tammy' },
  { name: 'Tangy', file: 'Tangy' },
  { name: 'Tank', file: 'Tank' },
  { name: 'T-Bone', file: 'T-Bone' },
  { name: 'Tasha', file: 'Tasha' },
  { name: 'Teddy', file: 'Teddy' },
  { name: 'Tex', file: 'Tex' },
  { name: 'Tia', file: 'Tia' },
  { name: 'Tiffany', file: 'Tiffany' },
  { name: 'Timbra', file: 'Timbra' },
  { name: 'Tipper', file: 'Tipper' },
  { name: 'Tom', file: 'Tom' },
  { name: 'Truffles', file: 'Truffles' },
  { name: 'Tucker', file: 'Tucker' },
  { name: 'Tutu', file: 'Tutu' },
  { name: 'Twiggy', file: 'Twiggy' },
  { name: 'Tybalt', file: 'Tybalt' },
  { name: 'Ursala', file: 'Ursala' },
  { name: 'Velma', file: 'Velma' },
  { name: 'Vesta', file: 'Vesta' },
  { name: 'Vic', file: 'Vic' },
  { name: 'Victoria', file: 'Victoria' },
  { name: 'Violet', file: 'Violet' },
  { name: 'Vivian', file: 'Vivian' },
  { name: 'Vladimir', file: 'Vladimir' },
  { name: 'Wade', file: 'Wade' },
  { name: 'Walker', file: 'Walker' },
  { name: 'Walt', file: 'Walt' },
  { name: 'Wart Jr.', file: 'Wart_Jr' },
  { name: 'Weber', file: 'Weber' },
  { name: 'Wendy', file: 'Wendy' },
  { name: 'Winnie', file: 'Winnie' },
  { name: 'Whitney', file: 'Whitney' },
  { name: 'Willow', file: 'Willow' },
  { name: 'Wolfgang', file: 'Wolfgang' },
  { name: 'Yuka', file: 'Yuka' },
  { name: 'Zell', file: 'Zell' },
  { name: 'Zucker', file: 'Zucker' },
];

const PORT = process.env.PORT || 3000;
const app = express();
const server = new http.Server(app);
let clientCount = 0;
const connections = {};

const io = socketIO(server, { pingInterval: 5000, pingTimeout: 1000 });

enum SocketEvent {
  PLAYER_SPEAK = 'playerSpeaks',
  PLAYER_MESSAGE = 'playerMessage',
  PLAYER_CONNECTED = 'playerConnected',
  PLAYER_DISCONNECTED = 'playerDisconnected',
}

io.on('connection', socket => {
  clientCount++;
  const villager = villagers[Math.floor(Math.random() * villagers.length)];
  connections[socket.id] = { socketId: socket.id, ...villager };
  console.log(`${villager.name} (${socket.id}) has connected!`);
  io.emit(SocketEvent.PLAYER_CONNECTED, {
    socketId: socket.id,
    connections: connections,
    name: villager.name,
    file: villager.file,
  });
  socket.on(SocketEvent.PLAYER_SPEAK, (data: { text: string }) => {
    const { text } = data;
    console.log(`${villager.name}: ${text}`);
    io.emit(SocketEvent.PLAYER_MESSAGE, { text: text, socketId: socket.id });
  });
  socket.on('disconnect', async () => {
    clientCount--;
    console.log(`${villager.name} (${socket.id}) has disconnected`);
    delete connections[socket.id];
    io.emit(SocketEvent.PLAYER_DISCONNECTED, {
      socketId: socket.id,
      connections: connections,
    });
  });
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
