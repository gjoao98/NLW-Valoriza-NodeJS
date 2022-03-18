import { getCustomRepository } from 'typeorm';
import { ComplimentsRepositories } from '../repositories/ComplimentsRepositories';
import { TagsRepositories } from '../repositories/TagsRepositories';
import { UsersRepositories } from '../repositories/UsersRepositories';

interface IComplimentRequest {
    tag_id: string;
    user_sender: string;
    user_receiver: string;
    message: string;
}

class CreateComplimentService {
    async execute({ tag_id, user_sender, user_receiver, message }: IComplimentRequest) {
        const complimentsRepository = getCustomRepository(ComplimentsRepositories);
        const usersRepository = getCustomRepository(UsersRepositories);
        const tagsRepository = getCustomRepository(TagsRepositories);

        const tagExists = await tagsRepository.findOne(tag_id);
        
        if(!tagExists) {
            throw new Error("You can not make a compliment in a invalid Tag");
        }

        const userReceiverExists = await usersRepository.findOne(user_receiver);
        
        if(!userReceiverExists) {
            throw new Error("You can not make a compliment for a invalid user");
        }
        
        if(user_sender === user_receiver) {
            throw new Error("You can not make a compliment for yourself");
        }

        const compliment = complimentsRepository.create({
            tag_id,
            user_sender,
            user_receiver,
            message
        });

        await complimentsRepository.save(compliment);

        return compliment;
    }
}

export { CreateComplimentService };