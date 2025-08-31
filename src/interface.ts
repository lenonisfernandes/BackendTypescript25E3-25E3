interface AnimalInterface {
    gerarUmSom(): void;
}

class Cachorro implements AnimalInterface{
    gerarUmSom(): void {
        console.log("Au Au");
    }
}

class Gato implements AnimalInterface {
    gerarUmSom(): void {
        console.log("Miau");
    }
}

class Dinossauro implements AnimalInterface {
    gerarUmSom(): void {
        console.log("Grrrr");
    }
}

function chamaAnimais (animal: AnimalInterface) {
    animal.gerarUmSom();
}

const cachorro = new Cachorro();
const gato = new Gato();
const dinossauro = new Dinossauro();

chamaAnimais(cachorro);
chamaAnimais(gato);
chamaAnimais(dinossauro);