import { Injectable } from "@nestjs/common";
import { CreateNinjaDto } from "./dto/create-ninja.dto";
import { UpdateNinjaDto } from "./dto/update-ninja.dto";

@Injectable()
export class NinjasService {

  private ninjas = [
    { id: 0, name: "ninjaA", weapon: "shuriken" },
    { id: 1, name: "ninjaB", weapon: "katana" },
    { id: 2, name: "ninjaC", weapon: "nunchaku" }
  ];

  getNinjas(weapon?: "shuriken" | "katana" | "nunchaku") {
    if (weapon) {
      return this.ninjas.filter(ninja => ninja.weapon === weapon);
    }

    return this.ninjas;
  }

  getOneNinja(id: number) {
    const ninja = this.ninjas.find(ninja => ninja.id === id);

    if (!ninja) {
      throw new Error("Ninja not found");
    }

    return ninja;
  }

  createNinja(createNinjaDto: CreateNinjaDto) {
    const newNinja = {
      id: Date.now(),
      ...createNinjaDto
    };
    this.ninjas.push(newNinja);

    return newNinja;
  }

  updateNinja(id: number, updateNinjaDto: UpdateNinjaDto) {
    const ninjaToBeUpdated = this.getOneNinja(id);
    const updatedNinja = {
      ...ninjaToBeUpdated,
      ...updateNinjaDto
    };
    this.ninjas = this.ninjas.map(ninja => ninja.id === id ? updatedNinja : ninja);

    return updatedNinja;
  }

  removeNinja(id: number) {
    const ninjaToBeRemoved = this.getOneNinja(id);
    this.ninjas = this.ninjas.filter(ninja => ninja.id !== id);

    return ninjaToBeRemoved;
  }

}
