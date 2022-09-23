import { Stack, StackProps } from 'aws-cdk-lib';
import { LayerVersion, Runtime, Code, Function} from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';

export class SampleStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // Deploy a layer into AWS via CDK
    const layer = new LayerVersion(this, 'LodashLayer', {
      layerVersionName: 'TsLodashLayer',
      compatibleRuntimes: [
        Runtime.NODEJS_14_X
      ],
      code: Code.fromAsset('./lodash-layer'),
    });

    // Deploy winston layer into AWS via CDK
    const winstonLayer = new LayerVersion(this, 'WinstonLayer', {
      layerVersionName: 'TsWinstonLayer',
      compatibleRuntimes: [
        Runtime.NODEJS_14_X
      ],
      code: Code.fromAsset('./winston'),
    });

    // Deploy a lambda into AWS via CDK
    const lambda = new NodejsFunction(this, 'SampleLambda', {
      entry: './lambda/main.js',
      layers: [layer, winstonLayer],
      bundling: {
        externalModules: ['lodash-layer', 'winston']
      }
    });
  }
}
