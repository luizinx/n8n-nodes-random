import {
  IDataObject,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
  IExecuteFunctions,
  NodeConnectionType
} from 'n8n-workflow';

export class Random implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Random',
    name: 'random',
    icon: 'file:random.svg',
    group: ['transform'],
    version: 1,
    description: 'True Random Number Generator via Random.org',
    defaults: {
      name: 'Random',
    },
    inputs: [NodeConnectionType.Main],
    outputs: [NodeConnectionType.Main], 
    properties: [
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        options: [
          {
            name: 'True Random Number Generator',
            value: 'trng',
            description: 'Return one integer between Min and Max (inclusive)',
          },
        ],
        default: 'trng',
      },
      {
        displayName: 'Min',
        name: 'min',
        type: 'number',
        typeOptions: {
          numberPrecision: 0,
        },
        default: 1,
        description: 'Minimum integer (inclusive)',
        required: true,
      },
      {
        displayName: 'Max',
        name: 'max',
        type: 'number',
        typeOptions: {
          numberPrecision: 0,
        },
        default: 60,
        description: 'Maximum integer (inclusive)',
        required: true,
      },
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();

    const returnData: INodeExecutionData[] = [];

    for (let i = 0; i < items.length; i++) {
      const operation = this.getNodeParameter('operation', i) as string;

      if (operation !== 'trng') {
        throw new Error('Unsupported operation');
      }

      const min = this.getNodeParameter('min', i) as number;
      const max = this.getNodeParameter('max', i) as number;


      if (!Number.isInteger(min) || !Number.isInteger(max)) {
        throw new Error('Min e Max precisam ser inteiros.');
      }
      if (min > max) {
        throw new Error('Min não pode ser maior que Max.');
      }

      const url = 'https://www.random.org/integers/';
      const qs: IDataObject = {
        num: 1,
        min,
        max,
        col: 1,
        base: 10,
        format: 'plain',
        rnd: 'new',
      };

      const response = await this.helpers.httpRequest({
        method: 'GET',
        url,
        qs,
        json: false,
      });

      const value = parseInt(String(response).trim(), 10);
      if (!Number.isInteger(value) || value < min || value > max) {
        throw new Error('Resposta inesperada do Random.org.');
      }

      returnData.push({
        json: {
          value,
          min,
          max,
          source: 'random.org',
        },
      });
    }

    return [returnData];
  }
}
