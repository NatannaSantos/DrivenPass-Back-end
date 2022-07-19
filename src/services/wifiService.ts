import { conflictError, notFoundError } from "../../utils/errorUtils.js";
import Cryptr from "cryptr";
import { WiFi } from "@prisma/client";
import wifiRepository from "../repositories/wifiRepository.js";

export type WifiData = Omit<WiFi, "id">

export async function createWifi(wifiData: WifiData) {
    const existingWifi = await wifiRepository.findByTitle(wifiData.title);

    if (existingWifi) {
        if (existingWifi.userId === wifiData.userId) {
            throw conflictError("existing title");
        }
    }

    const cryptr = new Cryptr('fdjshghjfsdg');

    const encryptedPassword = cryptr.encrypt(wifiData.password);

    await wifiRepository.insert({ ...wifiData, password: encryptedPassword });

}

export async function findWifi(userId: number) {
    const existingWifi = await wifiRepository.findByUserId(userId);

    if (!existingWifi) throw notFoundError("there are no wifis for this user");
    const wifi = createReturnObject(existingWifi);
    return (wifi);
}

export async function findWifiById(id: number, userId: number) {
    const existingWifi = await wifiRepository.findById(id);
    if (!existingWifi) throw notFoundError("there are no wifis");
    const cryptr = new Cryptr('fdjshghjfsdg');

    if (existingWifi) {
        if (existingWifi.userId !== userId) {
            throw notFoundError("there are no wifis for this user")
        }
    }

    const decryptPassword = cryptr.decrypt(existingWifi.password);

    return ({ ...existingWifi, password: decryptPassword });
}

export async function deleteWifi(userId: number, id: number) {
    const existingWifi = await wifiRepository.findById(id);
    if (!existingWifi) throw notFoundError("there are no wifis");

    if (existingWifi) {
        if (existingWifi.userId !== userId) {
            throw notFoundError("there are no wifis for this user")
        }
    }

    await wifiRepository.deleteById(id);
}

function createReturnObject(existingWifi: WiFi[]) {
    const cryptr = new Cryptr('fdjshghjfsdg');

    const wifi = existingWifi.map((wifi) => {
        const decryptPassword = cryptr.decrypt(wifi.password);

        return { ...wifi, password: decryptPassword };
    });
    return wifi;
}
