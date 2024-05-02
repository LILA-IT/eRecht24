/* tslint:disable */
/* eslint-disable */
/**
 * eRecht24.de API v2 (current)
 *  The eRecht24 Rechtstexte-API can be used to pull legal documents such as an imprint, a privacy policy or a privacy policy for social media from the eRecht24.de platform.<br> Clients can be registered in order to receive push notifications. From the [eRecht24 Projekt Manager](https://www.e-recht24.de/mitglieder/tools/projekt-manager/) you will then be able to synchronize changes of your imprint to the Client.<br><br> We encourage you to implement your own client to our API in order to use the eRecht24.de services. Please be aware that <b>you have to agree to special terms and conditions for our API</b> prior to the implementation of your own clients. Please contact us: <a href=\"mailto:api@e-recht24.de\">api@e-recht24.de</a><br> There are already modules / plugins for the following systems:  * [WordPress](https://www.e-recht24.de/mitglieder/tools/erecht24-rechtstexte-plugin/wordpress) <br>  * [Joomla](https://www.e-recht24.de/mitglieder/tools/erecht24-rechtstexte-plugin/joomla)<br>  * [HTML & PHP](https://www.e-recht24.de/mitglieder/tools/erecht24-rechtstexte-plugin/html-php)<br>  * [TYPO3](https://www.e-recht24.de/mitglieder/tools/erecht24-rechtstexte-plugin/typo3)<br><br>  **Get an API key**<br> Keys can be created using the [eRecht24 Projekt Manager](https://www.e-recht24.de/mitglieder/tools/projekt-manager/). All API keys are sha256 hashes. You can save them as varchar(64).<br> For development you can use the API key `e81cbf18a5239377aa4972773d34cc2b81ebc672879581bce29a0a4c414bf117`.  **Get a developer key**<br> Please note that all plugins contacting our API must send a verified developer key and an api key.<br> The developer key is a unique key issued by eRecht24 to each developer to identify the different plugins communicating with our API.<br>Keys are issued after you signed our terms and conditions for the API. <br><br>**New client**<br> A new client needs to register in order to receive push notifications. Without registration users will not be able to push legal documents to the client.<br> Every registered client receives a `client_id` and a `secret`. Please store both values on the client side.<br> The secret is used to check whether incoming push notifications are from eRecht24 and to prevent DoS attacks against our servers.<br> The `client_id` can be used to update stored client information or to delete the client.<br><br> ![Client](../assets/img/diag/eRecht24_API_doku-client_1-0.svg)  <br><br> **Push notifications**<br> The `/v1/clients/push` endpoint allows for testing during development. Clients can request push notifications via this endpoint in order to test functionality.<br> A push notification does not contain any sensible information. It merely notifies that there is new information for the client to pull and which kind of information to request from eRecht24.de.<br> When requesting a push notification you will receive: ``` {  \'erecht24_secret\' : \'varchar128\',  \'erecht24_type\' : \'ping\' or \'message\' or \'imprint\' or \'privacyPolicy\' or \'privacyPolicySocialMedia\' } ``` If the client is registered for GET-Requests, the parameters are added to the stored `push_uri`.<br> After receiving a push notification the client has to: 1. Check the `erecht24_secret` 2. If the received secret equals the stored secret, return http status code 200, otherwise a suited error status code. 3. Pull message, imprint, privacy policy or privacy policy for social media<br> In case of `\'erecht24_type\'=\'ping\'` answer with http status code 200 and json message `{ \'message\' : \'pong\' }` <br><br>  Test push notifications using the `testPush` endpoint:<br> ![PushTest](../assets/img/diag/eRecht24_API_doku-pushtest_1-0.svg?v=2019-03-17) <br><br> Push notification from eRecht24.de initiated:<br> ![Push](../assets/img/diag/push.svg?v=2020-06-03)  **Legal Document**<br> If the erecht24_type is a legal text, the client has to: 1. Check wether its a valid legal type and return http status code 400 in case it isnt. 2. If the data source of the legal text is set to be managed locally by the client, return http status code a 422. 3. Pull the content and either respond with http status code 200 if the pull was successfull.    Otherwise respond with 400.  **Messages**<br> Messages are short notifications that are to be displayed to the user in the client\'s administrative interface.<br> E.g.: Something regarding your privacy policy has changed and needs to be updated. The client will receive a push notification indicating that a new message is available for pull. The client then has to pull the message, store it and display it to the user. <br><br><br> **Support**<br> If you need support, feel free to contact our developers:<br> [api@e-recht24.de](mailto:api@e-recht24.de)  <br><br>*This API was created using OSS, the licences and copyright notices can be found in [LICENSES.md](/LICENSES.md).* 
 *
 * The version of the OpenAPI document: 2
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  Imprint,
  Model401,
  Model404Imprint,
  Model404PrivacyPolicy,
  Model404PrivacyPolicySocialMedia,
  Model503,
  PrivacyPolicy,
  PrivacyPolicySocialMedia,
} from '../models/index';
import {
    ImprintFromJSON,
    ImprintToJSON,
    Model401FromJSON,
    Model401ToJSON,
    Model404ImprintFromJSON,
    Model404ImprintToJSON,
    Model404PrivacyPolicyFromJSON,
    Model404PrivacyPolicyToJSON,
    Model404PrivacyPolicySocialMediaFromJSON,
    Model404PrivacyPolicySocialMediaToJSON,
    Model503FromJSON,
    Model503ToJSON,
    PrivacyPolicyFromJSON,
    PrivacyPolicyToJSON,
    PrivacyPolicySocialMediaFromJSON,
    PrivacyPolicySocialMediaToJSON,
} from '../models/index';

/**
 * LegalDocumentsApi - interface
 * 
 * @export
 * @interface LegalDocumentsApiInterface
 */
export interface LegalDocumentsApiInterface {
    /**
     * Get imprint linked to this API Key.
     * @summary Show imprint
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LegalDocumentsApiInterface
     */
    imprintGetRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Imprint>>;

    /**
     * Get imprint linked to this API Key.
     * Show imprint
     */
    imprintGet(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Imprint>;

    /**
     * Get privacy policy linked to this API Key.
     * @summary Show privacy policy
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LegalDocumentsApiInterface
     */
    privacyPolicyGetRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PrivacyPolicy>>;

    /**
     * Get privacy policy linked to this API Key.
     * Show privacy policy
     */
    privacyPolicyGet(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PrivacyPolicy>;

    /**
     * Get privacy policy information for social media linked to this API Key.
     * @summary Show privacy policy information for social media
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LegalDocumentsApiInterface
     */
    privacyPolicySocialMediaGetRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PrivacyPolicySocialMedia>>;

    /**
     * Get privacy policy information for social media linked to this API Key.
     * Show privacy policy information for social media
     */
    privacyPolicySocialMediaGet(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PrivacyPolicySocialMedia>;

}

/**
 * 
 */
export class LegalDocumentsApi extends runtime.BaseAPI implements LegalDocumentsApiInterface {

    /**
     * Get imprint linked to this API Key.
     * Show imprint
     */
    async imprintGetRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Imprint>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["eRecht24-api-key"] = await this.configuration.apiKey("eRecht24-api-key"); // eRecht24-api-key authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["eRecht24-plugin-key"] = await this.configuration.apiKey("eRecht24-plugin-key"); // eRecht24-plugin-key authentication
        }

        const response = await this.request({
            path: `/imprint`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ImprintFromJSON(jsonValue));
    }

    /**
     * Get imprint linked to this API Key.
     * Show imprint
     */
    async imprintGet(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Imprint> {
        const response = await this.imprintGetRaw(initOverrides);
        return await response.value();
    }

    /**
     * Get privacy policy linked to this API Key.
     * Show privacy policy
     */
    async privacyPolicyGetRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PrivacyPolicy>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["eRecht24-api-key"] = await this.configuration.apiKey("eRecht24-api-key"); // eRecht24-api-key authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["eRecht24-plugin-key"] = await this.configuration.apiKey("eRecht24-plugin-key"); // eRecht24-plugin-key authentication
        }

        const response = await this.request({
            path: `/privacyPolicy`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PrivacyPolicyFromJSON(jsonValue));
    }

    /**
     * Get privacy policy linked to this API Key.
     * Show privacy policy
     */
    async privacyPolicyGet(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PrivacyPolicy> {
        const response = await this.privacyPolicyGetRaw(initOverrides);
        return await response.value();
    }

    /**
     * Get privacy policy information for social media linked to this API Key.
     * Show privacy policy information for social media
     */
    async privacyPolicySocialMediaGetRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PrivacyPolicySocialMedia>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["eRecht24-api-key"] = await this.configuration.apiKey("eRecht24-api-key"); // eRecht24-api-key authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["eRecht24-plugin-key"] = await this.configuration.apiKey("eRecht24-plugin-key"); // eRecht24-plugin-key authentication
        }

        const response = await this.request({
            path: `/privacyPolicySocialMedia`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PrivacyPolicySocialMediaFromJSON(jsonValue));
    }

    /**
     * Get privacy policy information for social media linked to this API Key.
     * Show privacy policy information for social media
     */
    async privacyPolicySocialMediaGet(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PrivacyPolicySocialMedia> {
        const response = await this.privacyPolicySocialMediaGetRaw(initOverrides);
        return await response.value();
    }

}
