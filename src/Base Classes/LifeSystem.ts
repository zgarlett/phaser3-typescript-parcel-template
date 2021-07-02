export default class LifeSystem{
    private lifeTotal: number;

    constructor(life: number) {
        this.lifeTotal = life;
    }

    add(){
        this.lifeTotal++;
    }

    subtract(){
        this.lifeTotal--;
    }

    getLifeTotal(): number{
        return this.lifeTotal;
    }

    addToLife(toAdd: number){
        this.lifeTotal += toAdd;
    }

    subtractFromLife(toSubtract: number) {
        this.lifeTotal -= toSubtract;
    }
}