# <a href="#">App de Acompanhamento de Produtos</a>

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com) e [Node.js](https://nodejs.org/en/)). 
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

### 🛠️ Comando executado durante a construção da aplicação

```bash

# Criando o projeto [React Native](https://reactnative.dev/docs/environment-setup).
$ npx react-native@latest init AppMonitorProdutos

# Criando projeto no git
$ git init

# Adicionando arquivos criados
$ git add .

# Commitando arquivos adicionados
$ git commit -m "initial commit"

# Vinculando o repositório remoto ao git local
$ git remote add origin https://github.com/srgeverson/AppMonitorProdutos.git

# Enviando arquivos commitados
$ git push -u origin main

# Start Metro
$ npm start

# Executando App no Android.
$ npm run android

# [React Navigation](https://reactnavigation.org/)
$ npm install @react-navigation/native @react-navigation/native-stack
$ npm install react-native-screens react-native-safe-area-context

# [React Native Elements](https://reactnativeelements.com/)
$ npm install @rneui/themed @rneui/base
$ npm install @rneui/base@edge @rneui/themed@edge

# [React Native Vector Icons](https://github.com/oblador/react-native-vector-icons)
$ npm install react-native-vector-icons
$ npx react-native link react-native-vector-icons

# [React Native Element Dropdown](https://www.npmjs.com/package/react-native-element-dropdown)
$ npm install react-native-element-dropdown --save

# [Async Storage](https://react-native-async-storage.github.io/async-storage/)
$ npm install @react-native-async-storage/async-storage

# [React Native SQLite Storage](https://www.npmjs.com/package/react-native-sqlite-storage)
$ npm install react-native-sqlite-storage --save

# 

```

### 🧭 Executando a aplicação
```bash

# Clone este repositório
$ git clone https://github.com/srgeverson/AppMonitorProdutos.git

# Acesse a pasta do projeto no terminal/cmd
$ cd AppMonitorProdutos/

# Instale as dependências
$ npm install

# Execute a aplicação web
$ npm start

# Executando App no Android.
$ npm run android

#
$ keytool -genkeypair -v -storetype PKCS12 -keystore my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000

#
$ cp my-upload-key.keystore android/app/my-upload-key.keystore

#
$ echo 'MYAPP_UPLOAD_STORE_FILE=my-upload-key.keystore' >> android/gradle.properties
$ echo 'MYAPP_UPLOAD_KEY_ALIAS=my-key-alias' >> android/gradle.properties
$ echo 'MYAPP_UPLOAD_STORE_PASSWORD=*****' >> android/gradle.properties
$ echo 'MYAPP_UPLOAD_KEY_PASSWORD=*****' >> android/gradle.properties

# Edite o arquivo android/app/build.gradle
´´´
...
android {
    ...
    defaultConfig { ... }
    signingConfigs {
        release {
            if (project.hasProperty('MYAPP_UPLOAD_STORE_FILE')) {
                storeFile file(MYAPP_UPLOAD_STORE_FILE)
                storePassword MYAPP_UPLOAD_STORE_PASSWORD
                keyAlias MYAPP_UPLOAD_KEY_ALIAS
                keyPassword MYAPP_UPLOAD_KEY_PASSWORD
            }
        }
    }
    buildTypes {
        release {
            ...
            signingConfig signingConfigs.release
        }
    }
}
...
´´´

# Gerar .aab
$ cd android && ./gradlew bundleRelease

# Gerar .apk
$ cd android && ./gradlew assembleRelease

#
```

## 👨‍💻 Equipe de Desenvolvimento

* **Geverson Souza** - [Geverson Souza](https://www.linkedin.com/in/srgeverson/)

## ✒️ Autores

* **Geverson Souza** - [Geverson Souza](https://www.linkedin.com/in/srgeverson/)

## 📌 Versão 0.0.1

É utilizado o [Github](https://github.com/) para controle de versão.
