// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/authentication-jwt
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {UserCredentials} from '@loopback/authentication-jwt';
import {Entity, hasMany, hasOne, model, property} from '@loopback/repository';
import {Meet} from './meet.model';
import {AppFile} from './app-file.model';

@model({
  settings: {
    strict: false,
  },
})
export class User extends Entity {
  // must keep it
  // add id:string<UUID>
  @property({
    type: 'string',
    id: true,
    generated: false,
    defaultFn: 'uuidv4',
  })
  id: string;

  @property({
    type: 'string',
  })
  realm?: string;

  // must keep it
  @property({
    type: 'string',
  })
  username?: string;

  // must keep it
  // feat email unique

  @hasMany(() => Meet, {keyTo: 'userId'})
  meets: Meet[];

  @hasMany(() => AppFile)
  appFiles: AppFile[];
  @property({
    type: 'string',
    required: true,
    index: {
      unique: true,
    },
  })
  email: string;
  @property({
    type: 'string',
  })
  image: string;

  @property({
    type: 'boolean',
  })
  emailVerified?: boolean;
  @property({
    type: 'string',
  })
  verificationToken?: string;

  @hasOne(() => UserCredentials)
  userCredentials: UserCredentials;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
