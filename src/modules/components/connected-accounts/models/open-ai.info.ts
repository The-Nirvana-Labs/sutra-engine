import { OpenAIAccount } from '../entities/openai-account.entity';
import { ConnectedAccountType } from '../lookups/connected-account.enum';
import { ConnectedAccountInfo } from './base.info';

export class OpenAIAccountInfo extends ConnectedAccountInfo {
    constructor(openAIAccount: OpenAIAccount) {
        super(openAIAccount);
    }

    getType(): ConnectedAccountType {
        return ConnectedAccountType.OpenAI;
    }
}
