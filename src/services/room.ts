import { SavedRoomId } from 'models';
import { db } from '.';
import { Pagination } from 'schemas';
import * as fn from './fn';
import { jsonArrayFrom } from 'kysely/helpers/postgres';
import { ROOM_STATUS } from 'common';
import { AllRooms, ZodUpdateRoomAccessBodyType } from 'routes/organizations/teams/rooms/schema';

export const getDetails = async (id: SavedRoomId) => {
  return db
    .selectFrom('savedRoom')
    .where('savedRoom.id', '=', id)
    .select(['environment', 'status', 'title', 'teamId', 'orgKey'])
    .executeTakeFirstOrThrow();
  // TODO: need to move this join to a isolated mongo query
  // .select(['environment', 'status', 'title', 'team', 'client'])
  // .leftJoin('dlc', 'dlc.name', 'savedRoom.environment')
  // .where('dlc.envCover', '!=', 'null')
};

export const getRoomUrl = async (id: SavedRoomId, pagination: Pagination) => {
  let query =  db
    .selectFrom('roomAccess')
    .where('roomId', '=', id)
    .selectAll();
    const [rows, data] = await Promise.all([
      fn.query.count(query, 'exact'),
      query.offset(pagination.offset).limit(pagination.limit).execute(),
    ]);
    return { rows, data };
}
export const renameRoom = async (payload: { id: SavedRoomId, title: string }) => {
  return db.updateTable('savedRoom')
    .set({
      title: payload.title,
    }).where('id', '=', payload.id)
    .executeTakeFirst();
};

export const updateRoomAccess = async (id: SavedRoomId, payload: ZodUpdateRoomAccessBodyType) => {
  const updateAcccess = await  db.updateTable('roomAccess')
    .set({
      passwordProtect: payload.passwordProtect,
      allowAccess:  payload.allowAccess,
      urlState: payload.accessState
    }).where('roomId', '=', id)
    .executeTakeFirst();
    if(!updateAcccess){
      return false;
    } else {
      return db.updateTable('savedRoom')
      .set({
        password: payload.password
      }).where('id', '=', id)
    }
};


export const deleteRoom = async (payload: { id: SavedRoomId }) => {
  return db.deleteFrom('savedRoom')
    .where('id', '=', payload.id)
    .executeTakeFirst();
};

export const get = async (
  orgKey: string | null,
  teamId: any,
  pagination: Pagination & AllRooms
) => {
  let query = db
    .selectFrom('savedRoom')
    .where('orgKey', '=', orgKey)
    .where('teamId', '=', teamId)
    .where('savedRoom.status', '!=', ROOM_STATUS.deleted)
    .select((eb) => [
      'creatorName',
      'title',
      'orgKey',
      'teamId',
      'password',
      'environment',
      'status',
      'id',
      'createdAt',
      jsonArrayFrom(
        eb
          .selectFrom('currentRoomUser')
          .select('currentRoomUser.userEmail')
          .whereRef('savedRoom.id', '=', 'currentRoomUser.roomId')
      ).as('users'),
    ])
    .orderBy('savedRoom.status asc')
    .orderBy('createdAt desc');

  if (!pagination.allRooms) {
    query = query.offset(pagination.offset).limit(pagination.limit);
  }

  const [rows, data] = await Promise.all([fn.query.count(query, 'exact'), query.execute()]);
  return { rows, data };
};

export const addInfo = async (body: any) => {
  return db.insertInto('currentRoomUser').values(body).executeTakeFirstOrThrow();
};

export const getInfo = async () => {
  return db.selectFrom('currentRoomUser').selectAll().execute();
};
