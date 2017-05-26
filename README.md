# Hot Module Replacement (HMR) With Angular CLI

/// Install dev-dependency

`$ npm install --save-dev @angularclass/hmr` or `yarn add @angularclass/hmr --dev`

/// Create file `src/environments/environment.hmr.ts`

```
export const environment = {
 production: false,
 hmr: true
};
```

/// Edit file `src/environments/environment.prod.ts`

```
export const environment = {
 production: true,
 hmr: false
};
```

/// Edit file `src/environments/environment.ts`

```
export const environment = {
 production: false,
 hmr: false
};
```

/// Update file `.angular-cli.json`

```
...
    "environmentSource": "environments/environment.ts",
    "environments": {
      "dev": "environments/environment.ts",
      "hmr": "environments/environment.hmr.ts",
      "prod": "environments/environment.prod.ts"
    },
...
```

/// Create file `src/hmr.ts`

```
import { NgModuleRef, ApplicationRef } from '@angular/core';
import { createNewHosts } from '@angularclass/hmr';

export const hmrBootstrap = (module: any, bootstrap: () => Promise<NgModuleRef<any>>) => {
  let ngModule: NgModuleRef<any>;
  module.hot.accept();
  bootstrap().then(mod => ngModule = mod);
  module.hot.dispose(() => {
    const appRef: ApplicationRef = ngModule.injector.get(ApplicationRef);
    const elements = appRef.components.map(c => c.location.nativeElement);
    const makeVisible = createNewHosts(elements);
    ngModule.destroy();
    makeVisible();
  });
};
```

/// Update file `src/main.ts`

```
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { hmrBootstrap } from './hmr';

if (environment.production) {
  enableProdMode();
}

const bootstrap = () => platformBrowserDynamic().bootstrapModule(AppModule);

if (environment.hmr) {
  if (module[ 'hot' ]) {
    hmrBootstrap(module, bootstrap);
  } else {
    console.error('HMR is not enabled for webpack-dev-server!');
    console.log('Are you using the --hmr flag for ng serve?');
  }
} else {
  bootstrap();
}
```

# Starting the development environment with HMR enabled

`$ ng serve --hmr -e=hmr`

# Credits
Bram Borggreve [https://medium.com/@beeman/tutorial-enable-hmr-in-angular-cli-apps-1b0d13b80130](https://medium.com/@beeman/tutorial-enable-hmr-in-angular-cli-apps-1b0d13b80130)