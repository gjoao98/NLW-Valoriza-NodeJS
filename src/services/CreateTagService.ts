import { getCustomRepository } from "typeorm";
import { TagsRepositories } from "../repositories/TagsRepositories";

class CreateTagService {
    async execute(name: string) {
        const tagsRepository = getCustomRepository(TagsRepositories);

        if(!name) {
            throw new Error("You need to give a name to your Tag");
        }

        const tagAlreadyExists = await tagsRepository.findOne({
            name,
        });

        if(tagAlreadyExists) {
            throw new Error("Tag already was created!");
        }

        const tag = tagsRepository.create({
            name
        });

        await tagsRepository.save(tag);

        return tag;
    }
}

export { CreateTagService };