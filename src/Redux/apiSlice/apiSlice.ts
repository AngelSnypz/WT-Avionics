import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
//typing here might need to be done PER aircraft somehow, as each aircraft appears to have slightly different indicators and state responses

interface stateResponse {
  valid: boolean
  "aileron, %": number
  "elevator, %": number
  "rudder, %": number
  "flaps, %": number
  "gear, %": number
  "H, m": number //Alt above sea level
  "TAS, km/h": number
  "IAS, km/h": number
  M: number //Mach number
  "AoA, deg": number
  "AoS, deg": number //Sideslip
  Ny: number
  "Vy, m/s": number //vertical speed m/s
  "Wx, deg/s": number //roll rate deg/s
  "Mfuel, kg": number //total fuel
  "Mfuel0, kg": number //fuel ?per engine?
  "throttle 1, %": number
  "throttle 2, %"?: number
  "throttle 3, %"?: number
  "throttle 4, %"?: number
  "RPM throttle 1, %": number //?engine rpm %?
  "RPM throttle 2, %"?: number
  "RPM throttle 3, %"?: number
  "RPM throttle 4, %"?: number
  "mixture 1, %": number
  "mixture 2, %"?: number
  "mixture 3, %"?: number
  "mixture 4, %"?: number
  "radiator 1, %": number
  "radiator 2, %"?: number
  "radiator 3, %"?: number
  "radiator 4, %"?: number
  "compressor stage 1": number
  "compressor stage 2"?: number
  "compressor stage 3"?: number
  "compressor stage 4"?: number
  "magneto 1": number
  "magneto 2"?: number
  "magneto 3"?: number
  "magneto 4"?: number
  "power 1, hp": number
  "power 2, hp"?: number
  "power 3, hp"?: number
  "power 4, hp"?: number
  "RPM 1": number
  "RPM 2"?: number
  "RPM 3"?: number
  "RPM 4"?: number
  "manifold pressure 1, atm": number
  "manifold pressure 2, atm"?: number
  "manifold pressure 3, atm"?: number
  "manifold pressure 4, atm"?: number
  "oil temp 1, C": number
  "oil temp 2, C"?: number
  "oil temp 3, C"?: number
  "oil temp 4, C"?: number
  "pitch 1, deg": number //prop pitch, likely doesnt exist for jets
  "pitch 2, deg"?: number
  "pitch 3, deg"?: number
  "pitch 4, deg"?: number
  "thrust 1, kgs": number
  "thrust 2, kgs"?: number
  "thrust 3, kgs"?: number
  "thrust 4, kgs"?: number
  "efficiency 1, %": number
  "efficiency 2, %"?: number
  "efficiency 3, %"?: number
  "efficiency 4, %"?: number
}

//the 1/2/3 fields are for respective engines, may not exist
//similarly engines may be water or oil cooled, so some fields may not exist for those
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
  manifold_pressure1?: number
  manifold_pressure2?: number
  manifold_pressure3?: number
  rpm: number
  rpm1?: number
  rpm2?: number
  rpm3?: number
  oil_pressure: number
  oil_pressure1?: number
  oil_pressure2?: number
  oil_pressure3?: number
  oil_temperature: number
  oil_temperature1?: number
  oil_temperature2?: number
  oil_temperature3?: number
  water_temperature: number
  water_temperature1?: number
  water_temperature2?: number
  water_temperature3?: number
  mixture: number
  fuel1: number //this doesnt exist on the b27, but there are two for the skyraider, likely fueltank shenanigans for each aircraft.
  fuel2: number
  fuel_pressure: number
  fuel_pressure1?: number
  fuel_pressure2?: number
  fuel_pressure3?: number
  gears: number
  gear_lamp_down?: number
  gear_lamp_off?: number
  gear_lamp_up?: number
  flaps: number
  trimmer: number
  throttle: number
  weapon1: number
  flaps_indicator: number
  gear_l_indicator?: number
  gear_r_indicator?: number
  gear_c_indicator?: number
  blister1: number /// ??? doesnt exist on b27
  blister2: number
}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8111",
    headers: {},
  }),
  endpoints: builder => ({
    state: builder.query<stateResponse, string>({
      query: () => "/state",
    }),
    map_img: builder.query({
      query: () => "/map.img",
    }),
    indicators: builder.query<indicatorsResponse, string>({
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
