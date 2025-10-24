// @Injectable이 선언되어 있지 않습니다. BaseService 클래스를 직접 참조하지 않기 때문입니다.
import { ServiceA } from './service-A'; // ← 반드시 import

export class BaseService{
    constructor(private readonly serviceA: ServiceA) {}

    getHello(): string{
        return 'Hello World BASE!';
    }

    doSomeFuncFromA(): string{
        return this.serviceA.getHello();
    }
}