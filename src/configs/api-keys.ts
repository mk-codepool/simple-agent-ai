import { ApiKey, ApiKeyName } from "../models/api-keys.model";

export const API_KEYS: { [key in ApiKeyName]: ApiKey } = {
  [ApiKeyName.GPT]: {
    id: '',
    key: ''
  }
}