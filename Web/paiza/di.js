var lines = require("fs").readFileSync("/dev/stdin", "utf8").split("\n");
var lins = lines[0].split(" ");
var H = parseInt(lins[1]),W = parseInt(lins[0]);
var start,goal;
var map = [];
for (let i =0;i<H;i++){
    h = lines[i+1].split(" ");
    nodes = [];
    for (let j = 0;j<W;j++){
        if (h[j]==1){
            let node = {x:i,y:j,cost:Number.MAX_VALUE,dist:Number.MAX_VALUE,sum:Number.MAX_VALUE,parent:NULL};
            nodes.push(node);
        }
        else if(h[j]=="s"){
            let node = {x:i,y:j,cost:0,dist:Number.MAX_VALUE,sum:Number.MAX_VALUE,parent:NULL};
            start = [i,j];
           nodes.push(node);
        }
        else if(h[j]=="g"){
            let node = {x:i,y:j,cost:Number.MAX_VALUE,dist:0,sum:Number.MAX_VALUE,parent:NULL};
            nodes.push(node);
            goal = [i,j];
        }
        else{
            let node = {x:i,y:j,cost:Number.MAX_VALUE,dist:Number.MAX_VALUE,sum:Number.MAX_VALUE,parent:NULL};
            nodes.push(node);
        }
        
    }
    map.push(nodes);
}

let open_list =[start];
let closed_list = [];
let cost_list = [];
function appdata(x,y){
    let up = [x-1,y];
    let r = [x,y+1];
    let d = [x+1,y];
    let l = [x,y-1];
    if (up[0]>=0 & !closed_list.includes(up)&!open_list.includes(up)){
        i,j = up;
        map[i][j].cost = map[x][y].cost +1;
        map[i][j].dist = Math.abs(i-goal[0])+Math.abs(j-goal[1]);
        map[i][j].sum  = map[i][j].cost+map[i][j].dist;
        map[i][j].parent = [x,y];
        open_list.push([i,j]);
        cost_list.push(map[i][j].sum);

    }
    if (r[1]<=W& !closed_list.includes(r)&!open_list.includes(r)){
        i,j = r;
        map[i][j].cost = map[x][y].cost +1;
        map[i][j].dist = Math.abs(i-goal[0])+Math.abs(j-goal[1]);
        map[i][j].sum  = map[i][j].cost+map[i][j].dist;
        map[i][j].parent = [x,y];
        open_list.push([i,j]);
        cost_list.push(map[i][j].sum);    
    }
    if (d[0]<=H& !closed_list.includes(d)&!open_list.includes(d)){
        i,j = d;
        map[i][j].cost = map[x][y].cost +1;
        map[i][j].dist = Math.abs(i-goal[0])+Math.abs(j-goal[1]);
        map[i][j].sum  = map[i][j].cost+map[i][j].dist;
        map[i][j].parent = [x,y];
        open_list.push([i,j]);
        cost_list.push(map[i][j].sum);    
    }
    if (l[1]>=0& !closed_list.includes(l)&!open_list.includes(l)){
        i,j = l;
        map[i][j].cost = map[x][y].cost +1;
        map[i][j].dist = Math.abs(i-goal[0])+Math.abs(j-goal[1]);
        map[i][j].sum  = map[i][j].cost+map[i][j].dist;
        map[i][j].parent = [x,y];
        open_list.push([i,j]);
        cost_list.push(map[i][j].sum);    
    }
    open_list = open_list.filter(function(n){return n!=[x,y]});
    closed_list.push([x,y]);
}
function smallest(list){
    index = list.indexOf(Math.min(list));
    return index;
}
while (open_list.length>0 & !open_list.includes(goal)){
    let index = smallest(open_list);
    X,Y = open_list[index];
    appdata(X,Y);
}
let path =[];
if(open_list.length==0){
    console.log("Fail");

}
else if(open_list.includes(goal)){
    path.push(map[goal[0]][goal[1]].parent)
    while(path[-1]!=start){
        path.push(map[path[-1][0]][path[-1][1]].parent);
    ;}

}
console.log(path.length);
