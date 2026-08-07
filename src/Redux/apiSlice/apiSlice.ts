import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

interface indicatorsResponse {
  valid: boolean
  army: string
  type: string
  speed: number
  pedals1: number
  pedals2: number
  stick_elevator: number
  stick_ailerons: number
  vario: number
  altitude_hour: number
  altitude_min: number
  altitude_10k: number
  aviahorizon_roll: number
  aviahorizon_pitch: number
  bank: number
  turn: number
  compass: number
  compass1: number
  clock_hour: number
  clock_min: number
  clock_sec: number
  manifold_pressure: number
  rpm: number
  oil_pressure: number
  oil_pressure1: number
  oil_temperature: number
  water_temperature: number
  mixture: number
  fuel1: number
  fuel2: number
  fuel_pressure: number
  gears: number
  flaps: number
  trimmer: number
  throttle: number
  weapon1: number
  flaps_indicator: number
  gear_l_indicator: number
  gear_r_indicator: number
  gear_c_indicator: number
  blister1: number
  blister2: number
}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8111",
    headers: {},
  }),
  endpoints: builder => ({
    state: builder.query({
      query: () => "/state",
    }),
    map_img: builder.query({
      query: () => "/map.img",
    }),
    // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
    indicators: builder.query<indicatorsResponse, void>({
      query: () => "/indicators",
    }),
    map_obj: builder.query({
      query: () => "/map_obj.json",
    }),
    mission: builder.query({
      query: () => "/mission.json",
    }),
    map_info: builder.query({
      query: () => "/map_info.json",
    }),
  }),
})

export const {
  useStateQuery,
  useMap_imgQuery,
  useIndicatorsQuery,
  useMap_objQuery,
  useMissionQuery,
  useMap_infoQuery,
} = apiSlice
