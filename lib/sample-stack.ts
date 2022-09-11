import { Stack, StackProps } from 'aws-cdk-lib';
import { LayerVersion, Runtime, Code, Function } from 'aws-cdk-lib/aws-lambda';
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

    // Deploy a lambda into AWS via CDK
    const lambda = new Function(this, 'SampleLambda', {
      runtime: Runtime.NODEJS_14_X,
      handler: 'main.handler',
      code: Code.fromAsset('lambda'),
      memorySize: 1024,
      layers: [layer]
    });
  }
}
