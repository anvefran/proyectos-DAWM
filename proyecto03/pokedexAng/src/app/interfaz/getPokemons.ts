interface AllPokes{
    count: number;
    next: any;
    previous: any;
    results: NameAndUrl[];
}
interface NameAndUrl{
    name: string;
    url: string;
}
export{AllPokes, NameAndUrl}