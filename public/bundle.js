(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/* global mapboxgl */
// mapboxgl.accessToken = process.env.MapboxAccessToken;
mapboxgl.accessToken = 'pk.eyJ1IjoibWF3bWFwcCIsImEiOiJjaXQxcWFiemYwcjd3MnlwZ3d3d3NtYnN1In0.SKPELatkTwjLOFB2wyGEaQ';


var path = require('path');
var template = require('lodash.template');
var Raphael = require('raphael');

var wheel = require('./wheel');

// Templates
var listingTemplate = template("<div class='pad1 keyline-bottom'>\r\n  <h4>\r\n    <span class='pad0 inline dot space-right0 fill-<%- data.type %>'></span>\r\n    <%- data.NAME %>\r\n  </h4>\r\n  <div class='quiet'>\r\n    <% if (data.ADDRESS1) { %><%- data.ADDRESS1 %><% } %>\r\n    <% if (data.ADDRESS2) { %><%- data.ADDRESS2 %><% } %>\r\n  </div>\r\n  <% if (data.TEL) { %>\r\n    <a href='tel:+<%- data.phoneformatted %>' class='strong micro'><%- data.TEL %></a>\r\n  <% } %>\r\n  <% if (data.URL) { %>\r\n    &middot;  <a href='<%- data.URL %>' target='_blank' class='strong micro'>Website</a>\r\n  <% } %>\r\n</div>\r\n");
var $svg, lastValue = 0;

// Data
var data = [];
dataBuilder(JSON.parse("{\r\n\"type\": \"FeatureCollection\",\r\n\"crs\": { \"type\": \"name\", \"properties\": { \"name\": \"urn:ogc:def:crs:OGC:1.3:CRS84\" } },                                                                               \r\n\"features\": [\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Art Basel\", \"TEL\": \"\", \"URL\": \"artbasel.com\", \"ADDRESS1\": \"Miami Beach Convention Center\", \"ADDRESS2\": \"1901 Convention Center Dr\", \"CITY\": \"Miami Beach\", \"ZIP\":33139 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -80.133486, 25.794993 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Art on Paper\", \"TEL\": \"\", \"URL\": \"http://thepaperfair.com\", \"ADDRESS1\": \"Deauville Beach Resort\", \"ADDRESS2\": \"6701 Collins Avenue\", \"CITY\": \"Miami Beach\", \"ZIP\":33139 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -80.119767, 25.850804 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Aqua Art Miami    11th Edition\", \"TEL\": \"\", \"URL\": \"http://www.aquaartmiami.com/\", \"ADDRESS1\": \"Aqua Hotel\", \"ADDRESS2\": \"1530 Collins Avenue\", \"CITY\": \"Miami Beach\", \"ZIP\":33139 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -80.130828, 25.788248 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Design Miami \", \"TEL\": \"\", \"URL\": \"http://miami2016.designmiami.com/\", \"ADDRESS1\": \"Meridian Avenue & 19th Street\", \"ADDRESS2\": \"\", \"CITY\": \"Miami Beach\", \"ZIP\":33139 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -80.136683, 25.794904 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Fridge Art Fair\", \"TEL\": \"\", \"URL\": \"http://www.fridgeartfair.com/\", \"ADDRESS1\": \"Holiday Inn Miami Beach\", \"ADDRESS2\": \"4333 Collins Avenue\", \"CITY\": \"Miami Beach\", \"ZIP\":33139 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -80.122251, 25.814994 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"INK Miami Art Fair\", \"TEL\": \"\", \"URL\": \"http://inkartfair.com/\", \"ADDRESS1\": \"Suites of Dorchester\", \"ADDRESS2\": \"1850 Collins Avenue\", \"CITY\": \"Miami Beach\", \"ZIP\":33139 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -80.129838, 25.794877 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Miami Project\", \"TEL\": \"\", \"URL\": \"http://miami-project.com/\", \"ADDRESS1\": \"\", \"ADDRESS2\": \"6625 Indian Creek Drive\", \"CITY\": \"Miami Beach\", \"ZIP\":33139 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -80.121117, 25.850164 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"NADA / New Art Dealears Alliance\", \"TEL\": \"\", \"URL\": \"https://www.newartdealers.org/\", \"ADDRESS1\": \"Deauville Beach Resort\", \"ADDRESS2\": \"6701 Collins Avenue\", \"CITY\": \"Miami Beach\", \"ZIP\":33139 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -80.119767, 25.850804 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Pulse  Contemporary Art Fair\", \"TEL\": \"\", \"URL\": \"http://pulse-art.com/\", \"ADDRESS1\": \"Indian Beach Park\", \"ADDRESS2\": \"4601 Collins Avenue\", \"CITY\": \"Miami Beach\", \"ZIP\":33139 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -80.121591, 25.821299 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"SCOPE - Miami Beach\", \"TEL\": \"\", \"URL\": \"https://scope-art.com/\", \"ADDRESS1\": \"\", \"ADDRESS2\": \"801 Ocean Drive\", \"CITY\": \"Miami Beach\", \"ZIP\":33139 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -80.131186, 25.777959 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"UNTITLED\", \"TEL\": \"\", \"URL\": \"https://art-untitled.com/\", \"ADDRESS1\": \"\", \"ADDRESS2\": \"Ocean Drive & 12th Street\", \"CITY\": \"Miami Beach\", \"ZIP\":33139 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -80.130142, 25.782685 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"SATELLITE\", \"TEL\": \"\", \"URL\": \"http://satellite-show.com/\", \"ADDRESS1\": \"Parisian Hotel\", \"ADDRESS2\": \"1510 Collins Avenue\", \"CITY\": \"Miami Beach\", \"ZIP\":33139 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -80.130849, 25.787912 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Wolfsonian Museum\", \"TEL\": \"\", \"URL\": \"http://www.wolfsonian.org/\", \"ADDRESS1\": \"\", \"ADDRESS2\": \"1001 Washington Avenue\", \"CITY\": \"Miami Beach\", \"ZIP\":33139 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -80.13246, 25.780930 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"World Erotic Art Museum\", \"TEL\": \"\", \"URL\": \"http://weam.com/\", \"ADDRESS1\": \"\", \"ADDRESS2\": \"1205 Washington Avenue\", \"CITY\": \"Miami Beach\", \"ZIP\":33139 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -80.132091, 25.783279 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Jewish Museum of Florida\", \"TEL\": \"\", \"URL\": \"http://jmof.fiu.edu/\", \"ADDRESS1\": \"\", \"ADDRESS2\": \"301 Washington Avenue\", \"CITY\": \"Miami Beach\", \"ZIP\":33139 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -80.134237, 25.772495 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"All Soul's Episcopal Center\", \"TEL\": \"\", \"URL\": \"www.allsoulsmb.org\", \"ADDRESS1\": \"\", \"ADDRESS2\": \"4025 Pine Tree Drive\", \"CITY\": \"Miami Beach\", \"ZIP\":33139 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -80.126049, 25.813047 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Art Miami\", \"TEL\": \"305.517.7977\", \"URL\": \"​www.artmiamifair.com\", \"ADDRESS1\": \"3101 NE 1st Avenue\", \"ADDRESS2\": null, \"CITY\": \"Miami\", \"ZIP\": 33137 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -80.192676, 25.806141  ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Institute of Contemporary Art\", \"TEL\": \"305.901.5272\", \"URL\": \"http://www.icamiami.org/\", \"ADDRESS1\": \"4040 NE 2nd Avenue\", \"ADDRESS2\": null, \"CITY\": \"Miami\", \"ZIP\": 33137 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -80.191709, 25.813931 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Spinello Projects \", \"TEL\": \"786.271.4223\", \"URL\": \"http://spinelloprojects.com/ \", \"ADDRESS1\": \"7221 NW 2nd Avenue\", \"ADDRESS2\": null, \"CITY\": \"Miami\", \"ZIP\": 33150 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -80.200469, 25.841398 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Locust Projects\", \"TEL\": \"305.576.8570\", \"URL\": \"locustprojects.org\", \"ADDRESS1\": \"3852 N Miami Avenue\", \"ADDRESS2\": null, \"CITY\": \"Miami\", \"ZIP\": 33127 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [-80.195702, 25.812366 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"CONTEXT\", \"TEL\": \"305.517.7977\", \"URL\": \"www.contextartmiami.com\", \"ADDRESS1\": \"118 NE 34th Stree\", \"ADDRESS2\": null, \"CITY\": \"Miami\", \"ZIP\": 33127 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [-80.195702, 25.812366] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Prizm Art Fair\", \"TEL\": \"954.372.6241\", \"URL\": \"prizmartfair.com\", \"ADDRESS1\": \"7230 NW Miami Court\", \"ADDRESS2\": null, \"CITY\": \"Miami\", \"ZIP\": 33150 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -80.197406, 25.841399 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Pinta Miami\", \"TEL\": \"\", \"URL\": \"http://www.pintamiami.com/\", \"ADDRESS1\": \"318 NW 23 rd Street\", \"ADDRESS2\": null, \"CITY\": \"Miami\", \"ZIP\": 33127 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -80.202071,25.798011 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Martin Z. Margulies Collection\", \"TEL\": \"305.576.1051\", \"URL\": \"http://www.margulieswarehouse.com/\", \"ADDRESS1\": \"591 NW 27 Street\", \"ADDRESS2\": null, \"CITY\": \"Miami\", \"ZIP\": 33127 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -80.204929,25.802119 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Rubell Family Collection\", \"TEL\": \"305.573.6090\", \"URL\": \"https://rfc.museum/\", \"ADDRESS1\": \"95 NW 29 Street\", \"ADDRESS2\": null, \"CITY\": \"Miami\", \"ZIP\": 33127 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -80.196876,25.804179 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"De La Cruz\", \"TEL\": \"305.576.6112\", \"URL\": \"www.delacruzcollection.org\", \"ADDRESS1\": \"23 NE 41 Street\", \"ADDRESS2\": null, \"CITY\": \"Miami\", \"ZIP\": 33137 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -80.195003,25.814218 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Wynwood Walls\", \"TEL\": \"305.531.4411\", \"URL\": \"http://www.thewynwoodwalls.com/\", \"ADDRESS1\": \"2520 NW 2nd Avenue\", \"ADDRESS2\": null, \"CITY\": \"Miami\", \"ZIP\": 33127 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -80.199967,25.801083 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Bakehouse Art Complex\", \"TEL\": \"305.576.2828\", \"URL\": \"http://www.bacfl.org/\", \"ADDRESS1\": \"561 NW 32 Street\", \"ADDRESS2\": null, \"CITY\": \"Miami\", \"ZIP\": 33127 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -80.204793,25.806939 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Miami River Art Fair\", \"TEL\": \"973.270.7774\", \"URL\": \"http://miamiriverartfair.com/\", \"ADDRESS1\": \"400 SE 2nd. Avenue\", \"ADDRESS2\": null, \"CITY\": \"Miami\", \"ZIP\": 33131 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -80.190905, 25.770924  ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Traffic Jam\", \"TEL\": \"305.237.3010\", \"URL\": \"mdclivearts.org\", \"ADDRESS1\": \"Biscayne Blvd between 5th & 6th Streets\", \"ADDRESS2\": null, \"CITY\": \"Miami\", \"ZIP\": 33130 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -80.189672, 25.779585 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Perez Art Museum Miami\", \"TEL\": \"305.375.3000\", \"URL\": \"www.PAMM.org\", \"ADDRESS1\": \"1103 Biscayne Boulevard\", \"ADDRESS2\": null, \"CITY\": \"Miami\", \"ZIP\": 33132 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -80.186200, 25.785928 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"MDC Museum Art + Design\", \"TEL\": \"305.237.7700\", \"URL\": \"www.MDCMOAD.org\", \"ADDRESS1\": \"600 Biscayne Boulevard\", \"ADDRESS2\": null, \"CITY\": \"Miami\", \"ZIP\": 33132 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -80.189675, 25.780306 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Cisneros Fontanals Art Foundation\", \"TEL\": \"305.455.3333\", \"URL\": \"www.cifo.org\", \"ADDRESS1\": \"1018 North Miami Avenue\", \"ADDRESS2\": null, \"CITY\": \"Miami\", \"ZIP\": 33136 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -80.194441, 25.784029 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Miami International University of Art & Design\", \"TEL\": \"800.225.9023\", \"URL\": \"www.mymiu.edu\", \"ADDRESS1\": \"1501 Biscayne Boulevard\", \"ADDRESS2\": null, \"CITY\": \"Miami\", \"ZIP\": 33132 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -80.188563, 25.789866 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"National YoungArts Foundation\", \"TEL\": \"1.800.970.2787\", \"URL\": \"www.youngarts.org\", \"ADDRESS1\": \"2100 Biscayne Boulevard\", \"ADDRESS2\": null, \"CITY\": \"Miami\", \"ZIP\": 33131 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -80.189369, 25.797380 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"History Miami Museum\", \"TEL\": \"305.375.1492\", \"URL\": \"www.historymiami.org\", \"ADDRESS1\": \"101 West Flagler Street\", \"ADDRESS2\": null, \"CITY\": \"Miami\", \"ZIP\": 33130 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -80.196287, 25.774537 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Red Dot Art Fair Miami\", \"TEL\": \"\", \"URL\": \"reddotfair.com\", \"ADDRESS1\": \"1700 NE 2nd Avenue\", \"ADDRESS2\": null, \"CITY\": \"Miami\", \"ZIP\": 33132 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -80.191055, 25.792154 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"SPECTRUM Miami partnered with Miami Photo Salon\", \"TEL\": \"\", \"URL\": \"spectrum-miami.com\", \"ADDRESS1\": \"1700 NE 2nd Avenue\", \"ADDRESS2\": null, \"CITY\": \"Miami\", \"ZIP\": 33132 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -80.191055, 25.792154 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Prizm Art Fair\", \"TEL\": \"954.372.6241\", \"URL\": \"prizmartfair.com\", \"ADDRESS1\": \"7230 NW Miami Court\", \"ADDRESS2\": null, \"CITY\": \"Miami\", \"ZIP\": 33150 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -80.197406, 25.841399 ] } }\r\n\r\n\r\n]\r\n}"), 'art');
dataBuilder(JSON.parse("{\r\n\"type\": \"FeatureCollection\",\r\n\"crs\": { \"type\": \"name\", \"properties\": { \"name\": \"urn:ogc:def:crs:OGC:1.3:CRS84\" } },\r\n\"features\": [\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Nobu\", \"TEL\": \"305.695.3232\", \"URL\": \"http://www.noburestaurants.com/miami/experience/introduction/\", \"ADDRESS1\": \"4525 Collins Avenue\", \"ADDRESS2\": null, \"CITY\": \"Miami Beach\", \"ZIP\": 33140 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -80.121763, 25.819461 ] } },\t\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Mr. Chow\", \"TEL\": \"305.695.1695\", \"URL\": \"mrchow.com\", \"ADDRESS1\": \"2201 Collins Avenue\", \"ADDRESS2\": null, \"CITY\": \"Miami Beach\", \"ZIP\": 33139 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ 25.797742, -80.12748 ] } },\t\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Prime 112\", \"TEL\": \"305.532.8112\", \"URL\": \"http://mylesrestaurantgroup.com/\", \"ADDRESS1\": \"112 Ocean Drive\", \"ADDRESS2\": null, \"CITY\": \"Miami Beach\", \"ZIP\": 33139 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -80.133267, 25.769920 ] } },\t\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Red\", \"TEL\": \"305.534.3688\", \"URL\": \"redthesteakhouse.com\", \"ADDRESS1\": \"119 Washington Avenue\", \"ADDRESS2\": null, \"CITY\": \"Miami Beach\", \"ZIP\": 33139 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -80.134703, 25.770446 ] } },\t\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Havana 1957\", \"TEL\": \"305.503.3828\", \"URL\": \"havana1957.com\", \"ADDRESS1\": \"405 Española Way\", \"ADDRESS2\": null, \"CITY\": \"Miami Beach\", \"ZIP\": 33139 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -80.132043, 25.787083 ] } },\t\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Barton G\", \"TEL\": \"305.672.8881\", \"URL\": \"bartongtherestaurant.com\", \"ADDRESS1\": \"1427 West Avenue\", \"ADDRESS2\": null, \"CITY\": \"Miami Beach\", \"ZIP\": 33139 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [  -80.142029, 25.786163 ] } },\t\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Smith & Wollensky\", \"TEL\": \"305.673.2800\", \"URL\": \"http://smithandwollensky.com/locations-2/miami-beach/?menu=miami-beach\", \"ADDRESS1\": \"1 Washington Ave\", \"ADDRESS2\": null, \"CITY\": \"Miami Beach\", \"ZIP\": 33139 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -80.13394, 25.765903 ] } },\t\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Joe's Stone Crab\", \"TEL\": \"305.673.0365\", \"URL\": \"joesstonecrab.com\", \"ADDRESS1\": \"11 Washington Ave\", \"ADDRESS2\": null, \"CITY\": \"Miami Beach\", \"ZIP\": 33139 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -80.135039, 25.768854 ] } },\t\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"A Fish Called Avalon\", \"TEL\": \"305.532.1727\", \"URL\": \"afishcalledavalon.com\", \"ADDRESS1\": \"700 Ocean Drive\", \"ADDRESS2\": null, \"CITY\": \"Miami Beach\", \"ZIP\": 33139 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -80.131709, 25.776958 ] } },\t\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"WD555\", \"TEL\": \"305.672.6161\", \"URL\": \"wd555usa.com\", \"ADDRESS1\": \"555 Jefferson Avenue\", \"ADDRESS2\": null, \"CITY\": \"Miami Beach\", \"ZIP\": 33139 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -80.136907, 25.775564 ] } },\t\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Juvia\", \"TEL\": \"305.763.8272\", \"URL\": \"juviamiami.com\", \"ADDRESS1\": \"1111 Lincoln Road\", \"ADDRESS2\": null, \"CITY\": \"Miami Beach\", \"ZIP\": 33139 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [-80.141003,25.791907 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Bocce Ristorante\", \"TEL\": \"786.245.6211\", \"URL\": \"bocceristorante.com\", \"ADDRESS1\": \"3252 NE 1st Avenue #107\", \"ADDRESS2\": null, \"CITY\": \"Miami\", \"ZIP\": 33137 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -80.193092, 25.807599 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Novecento\", \"TEL\": \"305.576.7447\", \"URL\": \"novecento.com\", \"ADDRESS1\": \"3201 N Miami Avenue #116\", \"ADDRESS2\": null, \"CITY\": \"Miami\", \"ZIP\": 33127 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -80.194571, 25.808025 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Baru Urbano\", \"TEL\": \"786.502.3497\", \"URL\": \"barurbano.com\", \"ADDRESS1\": \"3252 NE 1st Ave #124\", \"ADDRESS2\": null, \"CITY\": \"Miami\", \"ZIP\": 33137 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -80.193691, 25.806910 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Sugar Cane Raw Bar Grill\", \"TEL\": \"786.369.0353\", \"URL\": \"sugarcanerawbargrill.com\", \"ADDRESS1\": \"3252 NE 1st Avenue\", \"ADDRESS2\": null, \"CITY\": \"Miami\", \"ZIP\": 33137 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -80.193302, 25.806915 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"The Cheese Course\", \"TEL\": \"786.220.6681\", \"URL\": \"thecheesecourse.com\", \"ADDRESS1\": \"3451 NE 1 Avenue #100\", \"ADDRESS2\": null, \"CITY\": \"Miami\", \"ZIP\": 33137 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -80.192094, 25.809634 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Midtown Oyster Bar\", \"TEL\": \"786.220.2070\", \"URL\": \"midtownoysterbar.com\", \"ADDRESS1\": \"3301 NE 1st Avenue, Suite 103-1\", \"ADDRESS2\": null, \"CITY\": \"Miami\", \"ZIP\": 33137 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -80.192723, 25.807847 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Michael's Genuine Food & Drink\", \"TEL\": \"305.573.5550\", \"URL\": \"michaelsgenuine.com\", \"ADDRESS1\": \"130 NE 40th Street\", \"ADDRESS2\": null, \"CITY\": \"Miami\", \"ZIP\": 33137 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -80.192702, 25.813206 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"The Cypress Room\", \"TEL\": \"305.520.5197\", \"URL\": \"thecypressroom.com\", \"ADDRESS1\": \"3620 NE 2nd Avenue\", \"ADDRESS2\": null, \"CITY\": \"Miami\", \"ZIP\": 33137 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -80.191513, 25.811050 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Blackbrick Chinese\", \"TEL\": \"305.573.8886\", \"URL\": \"midtownchinese.com\", \"ADDRESS1\": \"3451 NE 1st Avenue\", \"ADDRESS2\": null, \"CITY\": \"Miami\", \"ZIP\": 33137 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -80.192080, 25.809459 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Harry's Pizzeria\", \"TEL\": \"786.275.4963\", \"URL\": \"harryspizzeria.tumblr.com\", \"ADDRESS1\": \"3918 N Miami Avenue\", \"ADDRESS2\": null, \"CITY\": \"Miami\", \"ZIP\": 33127 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -80.195698, 25.812853 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Proof\", \"TEL\": \"786.536.9562\", \"URL\": \"proofpizza.com\", \"ADDRESS1\": \"3328 N Miami Avenue\", \"ADDRESS2\": null, \"CITY\": \"Miami\", \"ZIP\": 33127 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -80.195484, 25.808075 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Joey's Italian Cafe\", \"TEL\": \"305.438.0488\", \"URL\": \"joeyswynwood.com\", \"ADDRESS1\": \"2506 NW 2nd Avenue\", \"ADDRESS2\": null, \"CITY\": \"Miami\", \"ZIP\": 33127 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -80.199228, 25.800906 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Pride and Joy\", \"TEL\": \"305.456.9548\", \"URL\": \"https://www.facebook.com/PrideAndJoyBBQ\", \"ADDRESS1\": \"2800 N Miami Avenue\", \"ADDRESS2\": null, \"CITY\": \"Miami\", \"ZIP\": 33127 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -80.195291, 25.803276 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Prohibition\", \"TEL\": \"305.438.9199\", \"URL\": \"prohibitionmiami.com\", \"ADDRESS1\": \"3404 N Miami Ave\", \"ADDRESS2\": null, \"CITY\": \"Miami\", \"ZIP\": 33127 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -80.195389, 25.808395 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"R House\", \"TEL\": \"305.576.0201\", \"URL\": \"rhousewynwood.com\", \"ADDRESS1\": \"2727 NW 2nd Avenue\", \"ADDRESS2\": null, \"CITY\": \"Miami\", \"ZIP\": 33127 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -80.198988, 25.802714 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Wynwood Kitchen & Bar\", \"TEL\": \"305.722.8959\", \"URL\": \"wynwoodkitchenandbar.com\", \"ADDRESS1\": \"2550 NW 2nd Avenue\", \"ADDRESS2\": null, \"CITY\": \"Miami\", \"ZIP\": 33127 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -80.199322, 25.801352 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Kush\", \"TEL\": \"305.576.4500\", \"URL\": \"kushwynwood.com\", \"ADDRESS1\": \"2003 N Miami Avenue\", \"ADDRESS2\": null, \"CITY\": \"Wynwood\", \"ZIP\": 33127 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -80.194676, 25.795798 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Gigi's\", \"TEL\": \"305.573.1520\", \"URL\": \"giginow.com\", \"ADDRESS1\": \"3470 N Miami Avenue\", \"ADDRESS2\": null, \"CITY\": \"Miami\", \"ZIP\": 33127 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -80.195441, 25.809577 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Zak the Baker\", \"TEL\": \"786.347.7100\", \"URL\": \"zakthebaker.com\", \"ADDRESS1\": \"405 NW 26th Street\", \"ADDRESS2\": null, \"CITY\": \"Miami\", \"ZIP\": 33127 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -80.202074, 25.801576 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Mignonette\", \"TEL\": \"305.374.4635\", \"URL\": \"mignonettemiami.com\", \"ADDRESS1\": \"210 NE 18th Street\", \"ADDRESS2\": null, \"CITY\": \"Miami\", \"ZIP\": 33132 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -80.190476, 25.793305  ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Books & Books at the Arsht\", \"TEL\": \"786.405.1745\", \"URL\": \"http://www.arshtcenter.org/Visit/Cafe-Books-Books/\", \"ADDRESS1\": \"1300 Biscayne Boulevard\", \"ADDRESS2\": null, \"CITY\": \"Miami\", \"ZIP\": 33132 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -80.189372, 25.787381 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Zuma\", \"TEL\": \"305.577.0277\", \"URL\": \"zumarestaurantmiami.com\", \"ADDRESS1\": \"270 Biscayne Boulevard Way\", \"ADDRESS2\": null, \"CITY\": \"Miami\", \"ZIP\": 33131 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -80.189559, 25.770551 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Il Gabbiano\", \"TEL\": \"305.373.0063\", \"URL\": \"ilgabbianomiami.com\", \"ADDRESS1\": \"335 S Biscayne Blvd\", \"ADDRESS2\": null, \"CITY\": \"Miami\", \"ZIP\": 33131 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -80.185218, 25.771631 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Capital Grille\", \"TEL\": \"305.374.4500\", \"URL\": \"thecapitalgrille.com\", \"ADDRESS1\": \"444 Brickell Avenue\", \"ADDRESS2\": null, \"CITY\": \"Miami\", \"ZIP\": 33131 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -80.190273, 25.769532 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Coya\", \"TEL\": \"305.415.9990\", \"URL\": \"coyarestaurant.com/miami\", \"ADDRESS1\": \"999 Brickell Avenue\", \"ADDRESS2\": null, \"CITY\": \"Miami\", \"ZIP\": 33131 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -80.190509, 25.763887 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Tamarina\", \"TEL\": \"305.579.1888\", \"URL\": \"tamarinarestaurants.com\", \"ADDRESS1\": \"600 Brickell Avenue\", \"ADDRESS2\": null, \"CITY\": \"Miami\", \"ZIP\": 33131 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -80.190685, 25.767673 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Seaspice Miami\", \"TEL\": \"305.440.4200\", \"URL\": \"seaspicemiami.com\", \"ADDRESS1\": \"422 NW North River Drive\", \"ADDRESS2\": null, \"CITY\": \"Miami\", \"ZIP\": 33128 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -80.204684, 25.777713 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Casablanca on the Bay\", \"TEL\": \"305.371.4930\", \"URL\": \"casablancaonthebay.com\", \"ADDRESS1\": \"1717 N Bayshore Drive #200\", \"ADDRESS2\": null, \"CITY\": \"Miami\", \"ZIP\": 33132 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -80.185558, 25.791550 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Garcia's Sea Food Grill\", \"TEL\": \"305.375.0765\", \"URL\": \"garciasseafoodgrill.com\", \"ADDRESS1\": \"398 NW North River Drive\", \"ADDRESS2\": null, \"CITY\": \"Miami\", \"ZIP\": 33128 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -80.203734, 25.777399 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"The River Seafood Oyster Bar\", \"TEL\": \"305.530.1915\", \"URL\": \"therivermiami.com\", \"ADDRESS1\": \"650 S Miami Avenue\", \"ADDRESS2\": null, \"CITY\": \"Miami\", \"ZIP\": 33131 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -80.193467, 25.767498 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Toro Toro Miami\", \"TEL\": \"305.372.4710\", \"URL\": \"torotoromiami.com\", \"ADDRESS1\": \"100 Chopin Plaza\", \"ADDRESS2\": null, \"CITY\": \"Miami\", \"ZIP\": 33132 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -80.185336, 25.772558 ] } }\r\n]\r\n}"), 'music');
dataBuilder(JSON.parse("{\r\n\"type\": \"FeatureCollection\",\r\n\"crs\": { \"type\": \"name\", \"properties\": { \"name\": \"urn:ogc:def:crs:OGC:1.3:CRS84\" } },\r\n                                                                                \r\n\"features\": [\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Alexander Hamilton U.S. Custom House\", \"TEL\": \"(212) 514-3700\", \"URL\": \"http:\\/\\/www.oldnycustomhouse.gov\\/\", \"ADRESS1\": \"1 Bowling Grn\", \"ADDRESS2\": null, \"CITY\": \"New York\", \"ZIP\": 10004.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -74.013755795197326, 40.703816216917993 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Alice Austen House Museum\", \"TEL\": \"(718) 816-4506\", \"URL\": \"http:\\/\\/www.aliceausten.org\\/\", \"ADRESS1\": \"2 Hylan Blvd\", \"ADDRESS2\": null, \"CITY\": \"Staten Island\", \"ZIP\": 10305.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -74.063031788551058, 40.615120837755327 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"American Academy of Arts and Letters\", \"TEL\": \"(212) 368-5900\", \"URL\": \"http:\\/\\/www.artsandletters.org\\/\", \"ADRESS1\": \"633 W. 155th St.\", \"ADDRESS2\": null, \"CITY\": \"New York\", \"ZIP\": 10032.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.947297685415663, 40.833853500753278 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"American Folk Art Museum\", \"TEL\": \"(212) 265-1040\", \"URL\": \"http:\\/\\/www.folkartmuseum.org\\/\", \"ADRESS1\": \"45 West 53rd Street\", \"ADDRESS2\": null, \"CITY\": \"New York\", \"ZIP\": 10019.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.978103021099955, 40.761624971385451 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"American Immigration History Center\", \"TEL\": \"(212) 363-3200\", \"URL\": \"http:\\/\\/www.ellisisland.org\\/\", \"ADRESS1\": \"Ellis Island\", \"ADDRESS2\": null, \"CITY\": \"New York\", \"ZIP\": 0.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -74.039684837490356, 40.699056262443875 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"American Museum of Natural History\", \"TEL\": \"(212) 769-5100\", \"URL\": \"http:\\/\\/www.amnh.org\\/\", \"ADRESS1\": \"Central Park West at 79th Street\", \"ADDRESS2\": null, \"CITY\": \"New York\", \"ZIP\": 10024.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.973648163778094, 40.780826234576409 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"American Numismatic Society\", \"TEL\": \"(212) 571-4470\", \"URL\": \"http:\\/\\/www.numismatics.org\\/\", \"ADRESS1\": \"75 Varick St\", \"ADDRESS2\": \"11th Floor\", \"CITY\": \"New York\", \"ZIP\": 10013.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -74.00701187920869, 40.723526592628197 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Americas Society\", \"TEL\": \"(212) 249-8950\", \"URL\": \"http:\\/\\/as.americas-society.org\\/\", \"ADRESS1\": \"680 Park Ave.\", \"ADDRESS2\": null, \"CITY\": \"New York\", \"ZIP\": 10021.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.965970452583505, 40.768824228952681 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Anne Frank Center USA\", \"TEL\": \"(212) 431-7993\", \"URL\": \"http:\\/\\/www.annefrank.com\\/\", \"ADRESS1\": \"38 Crosby Street\", \"ADDRESS2\": \"5th Floor\", \"CITY\": \"New York\", \"ZIP\": 10012.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.999630369030868, 40.721127449476647 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Asia Society\", \"TEL\": \"(212) 288-6400\", \"URL\": \"http:\\/\\/www.asiasociety.org\\/\", \"ADRESS1\": \"725 Park Avenue\", \"ADDRESS2\": null, \"CITY\": \"New York\", \"ZIP\": 10021.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.964283957266076, 40.769833782653478 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Audubon Terrace\", \"TEL\": null, \"URL\": \"http:\\/\\/www.washington-heights.us\\/history\\/archives\\/audubon_terrace_museum_group_102.html\", \"ADRESS1\": \"Broadway at 155 Street\", \"ADDRESS2\": null, \"CITY\": \"New York\", \"ZIP\": 10032.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.946545904943207, 40.833582282460419 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Bartow-Pell Mansion\", \"TEL\": \"(718) 885-1461\", \"URL\": \"http:\\/\\/bartowpellmansionmuseum.org\\/index.php\", \"ADRESS1\": \"895 Shore Road\", \"ADDRESS2\": \"Pelham Bay Park\", \"CITY\": \"Bronx\", \"ZIP\": 10464.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.805579499957503, 40.871778316782681 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Bowne House\", \"TEL\": \"(718) 359-0528\", \"URL\": \"http:\\/\\/www.bownehouse.org\\/\", \"ADRESS1\": \"37-01 Bowne Street\", \"ADDRESS2\": null, \"CITY\": \"Queens\", \"ZIP\": 11354.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.824890463856192, 40.762886331946611 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Bronx Historical Society & Musem\", \"TEL\": \"(718) 881-8900\", \"URL\": \"http:\\/\\/www.bronxhistoricalsociety.org\\/\", \"ADRESS1\": \"3309 Bainbridge Ave\", \"ADDRESS2\": null, \"CITY\": \"Bronx\", \"ZIP\": 10467.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.879748740035552, 40.878236441348911 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Bronx Museum of the Arts (BXMA)\", \"TEL\": \"(718) 681-6000\", \"URL\": \"http:\\/\\/www.bronxmuseum.org\\/\", \"ADRESS1\": \"1040 Grand Concourse\", \"ADDRESS2\": null, \"CITY\": \"Bronx\", \"ZIP\": 10456.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.919750177248233, 40.831029779928457 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Brooklyn Children's Museum\", \"TEL\": \"(718) 735-4400\", \"URL\": \"http:\\/\\/www.brooklynkids.org\\/\", \"ADRESS1\": \"145 Brooklyn Avenue\", \"ADDRESS2\": null, \"CITY\": \"Brooklyn\", \"ZIP\": 11213.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.944016013837427, 40.674506996099275 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Brooklyn Historical Society\", \"TEL\": \"(718) 222-4111\", \"URL\": \"http:\\/\\/www.brooklynhistory.org\\/default\\/index.html\", \"ADRESS1\": \"128 Pierrepont Street\", \"ADDRESS2\": null, \"CITY\": \"Brooklyn\", \"ZIP\": 11201.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.992405403931258, 40.694802974910424 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Brooklyn Museum\", \"TEL\": \"(718) 638-5000\", \"URL\": \"http:\\/\\/www.brooklynmuseum.org\\/\", \"ADRESS1\": \"200 Eastern Parkway\", \"ADDRESS2\": null, \"CITY\": \"Brooklyn\", \"ZIP\": 11238.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.963585067976553, 40.671083212126256 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Chelsea Art Museum\", \"TEL\": \"(212) 255-0719\", \"URL\": \"http:\\/\\/www.chelseaartmuseum.org\\/\", \"ADRESS1\": \"556 West 22nd Street\", \"ADDRESS2\": null, \"CITY\": \"New York\", \"ZIP\": 10011.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -74.007315533742556, 40.747897602067347 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Children's Museum of Manhattan\", \"TEL\": \"(212) 721-1234\", \"URL\": \"http:\\/\\/www.cmom.org\\/\", \"ADRESS1\": \"212 West 83rd Street\", \"ADDRESS2\": null, \"CITY\": \"New York\", \"ZIP\": 10024.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.977273919681622, 40.78587092106752 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Children's Museum of the Arts\", \"TEL\": \"(212) 274-0986\", \"URL\": \"http:\\/\\/cmany.org\\/intro.php?pn=home\", \"ADRESS1\": \"182 Lafayette Street\", \"ADDRESS2\": null, \"CITY\": \"New York\", \"ZIP\": 10012.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.998838360904784, 40.720749468810034 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Cloisters\", \"TEL\": \"(212) 923-3700\", \"URL\": \"http:\\/\\/www.metmuseum.org\\/cloisters\\/\", \"ADRESS1\": \"99 Margaret Corbin Drive\", \"ADDRESS2\": null, \"CITY\": \"New York\", \"ZIP\": 10040.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.931734087060377, 40.864923635748085 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Coney Island Museum\", \"TEL\": \"(718) 372-5159\", \"URL\": \"http:\\/\\/www.coneyisland.com\\/\", \"ADRESS1\": \"1208 Surf Ave\", \"ADDRESS2\": null, \"CITY\": \"Brooklyn\", \"ZIP\": 11224.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.979855984152636, 40.575263242520577 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Cooper-Hewitt, National Design Museum\", \"TEL\": \"(212) 849-8400\", \"URL\": \"http:\\/\\/www.cooperhewitt.org\\/\", \"ADRESS1\": \"2 East 91st Street\", \"ADDRESS2\": null, \"CITY\": \"New York\", \"ZIP\": 10128.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.957781619754556, 40.784325739936783 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Dahesh Museum\", \"TEL\": \"(212) 759-0606\", \"URL\": \"http:\\/\\/www.daheshmuseum.org\", \"ADRESS1\": \"580 Madison Avenue\", \"ADDRESS2\": null, \"CITY\": \"New York\", \"ZIP\": 10022.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.973041901420999, 40.762106972962542 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Dia at the Hispanic Society\", \"TEL\": \"(845) 440-0100\", \"URL\": \"http:\\/\\/www.diabeacon.org\\/\", \"ADRESS1\": \"613 West 155th Street\", \"ADDRESS2\": null, \"CITY\": \"New York\", \"ZIP\": 10032.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.946493181696667, 40.833302109701286 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Dia Art Foundation\", \"TEL\": \"(212) 989 5566\", \"URL\": \"http:\\/\\/www.diacenter.org\\/\", \"ADRESS1\": \"535 W 22nd Street\", \"ADDRESS2\": null, \"CITY\": \"New York\", \"ZIP\": 10011.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -74.006135375786158, 40.747894926234224 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Discovery Times Square Exposition\", \"TEL\": \"(866) 987-9692\", \"URL\": \"http:\\/\\/www.discoverytsx.com\\/nyc\\/\", \"ADRESS1\": \"226 W 44th St\", \"ADDRESS2\": null, \"CITY\": \"New York\", \"ZIP\": 1036.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.987318639594363, 40.757501085511812 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Drawing Center\", \"TEL\": \"(212) 219-2166\", \"URL\": \"http:\\/\\/www.drawingcenter.org\\/about_visit.cfm\", \"ADRESS1\": \"35 Wooster St.\", \"ADDRESS2\": null, \"CITY\": \"New York\", \"ZIP\": 10013.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -74.002904172041653, 40.722451188527806 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Dyckman Farmhouse\", \"TEL\": \"(212) 304-9422\", \"URL\": \"http:\\/\\/www.dyckmanfarmhouse.org\\/\", \"ADRESS1\": \"4881 Broadway\", \"ADDRESS2\": null, \"CITY\": \"New York\", \"ZIP\": 10034.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.923839147487527, 40.867130920935473 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"East Village History Project\", \"TEL\": \"(212) 614-8702\", \"URL\": \"http:\\/\\/leshp.org\\/\", \"ADRESS1\": \"308 Bowery\", \"ADDRESS2\": null, \"CITY\": \"New York\", \"ZIP\": 10012.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.99272306225815, 40.724959704166771 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"El Museo del Barrio\", \"TEL\": \"(212) 831-7272\", \"URL\": \"http:\\/\\/www.elmuseo.org\\/\", \"ADRESS1\": \"1230 Fifth Ave\", \"ADDRESS2\": null, \"CITY\": \"New York\", \"ZIP\": 10029.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.951367601116601, 40.79309892078939 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Ellis Island Museum\", \"TEL\": \"(212) 363-3200\", \"URL\": \"http:\\/\\/www.ellisisland.org\\/\", \"ADRESS1\": \"Ellis Island\", \"ADDRESS2\": null, \"CITY\": \"New York\", \"ZIP\": 0.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -74.041321617942387, 40.698207553302943 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Fraunces Tavern Museum\", \"TEL\": \"(212) 425-1778\", \"URL\": \"http:\\/\\/www.frauncestavernmuseum.org\\/\", \"ADRESS1\": \"54 Pearl Street\", \"ADDRESS2\": null, \"CITY\": \"New York\", \"ZIP\": 10004.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -74.011339263179181, 40.703399275987827 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Frick Collection\", \"TEL\": \"(212) 288-0700\", \"URL\": \"http:\\/\\/www.frick.org\\/\", \"ADRESS1\": \"1 E. 70th Street\", \"ADDRESS2\": null, \"CITY\": \"New York\", \"ZIP\": 10021.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.967080405398008, 40.771054653505423 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Garibaldi-Meucci Museum\", \"TEL\": \"(718) 442-1608\", \"URL\": \"http:\\/\\/statenislandusa.com\\/pages\\/garibaldi.html\", \"ADRESS1\": \"420 Tompkins Avenue\", \"ADDRESS2\": null, \"CITY\": \"Staten Island\", \"ZIP\": 10305.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -74.073877742907385, 40.615165224015072 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Goethe-Institut New York\", \"TEL\": \"(212) 439-8700\", \"URL\": \"http:\\/\\/www.goethe.de\\/ins\\/us\\/ney\\/deindex.htm\", \"ADRESS1\": \"1014 Fifth Avenue\", \"ADDRESS2\": null, \"CITY\": \"New York\", \"ZIP\": 10028.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.961742040152274, 40.779165640852433 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Gracie Mansion\", \"TEL\": \"(212)-570-4751\", \"URL\": \"http:\\/\\/www.nyc.gov\\/html\\/om\\/html\\/gracie.html\", \"ADRESS1\": \"89th Street at East End Avenue\", \"ADDRESS2\": \"Carl Schurz Park\", \"CITY\": \"New York\", \"ZIP\": 10128.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.943068462686739, 40.776113450030337 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Hall Of Fame For Great Americans\", \"TEL\": \"(718) 289-5161\", \"URL\": \"http:\\/\\/www.bcc.cuny.edu\\/hallofFame\\/\", \"ADRESS1\": \"Hall of Fame Terrace & Sedgwick Avenue\", \"ADDRESS2\": null, \"CITY\": \"Bronx\", \"ZIP\": 10453.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.913979629180275, 40.858747169788543 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Harbor Defense Museum of Fort Hamilton\", \"TEL\": \"(718) 630-4349\", \"URL\": \"http:\\/\\/www.harbordefensemuseum.com\\/\", \"ADRESS1\": \"230 Sheridan Loop\", \"ADDRESS2\": null, \"CITY\": \"Brooklyn\", \"ZIP\": 11252.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -74.032310775733592, 40.609008668506839 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Hispanic Society of America Museum\", \"TEL\": \"(212) 926-2234\", \"URL\": \"http:\\/\\/www.hispanicsociety.org\\/\", \"ADRESS1\": \"613 West 155th Street\", \"ADDRESS2\": null, \"CITY\": \"New York\", \"ZIP\": 10032.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.946822822305094, 40.833452146758056 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Holocaust Museum & Studies Center\", \"TEL\": \"(718) 817-7700\", \"URL\": \"http:\\/\\/www.holocauststudies.org\\/\", \"ADRESS1\": \"75 W 205th St\", \"ADDRESS2\": null, \"CITY\": \"Bronx\", \"ZIP\": 10468.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.890987843841017, 40.878357864990143 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Hudson Waterfront Museum and Showboat Barge\", \"TEL\": \"(718) 624-4719\", \"URL\": \"http:\\/\\/www.waterfrontmuseum.org\\/\", \"ADRESS1\": \"290 Conover St.\", \"ADDRESS2\": null, \"CITY\": \"Brooklyn\", \"ZIP\": 11231.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -74.018086943095497, 40.675571934874299 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"International Center of Photography\", \"TEL\": \"(212) 857-0000\", \"URL\": \"http:\\/\\/www.icp.org\\/\", \"ADRESS1\": \"1133 Avenue Of The Americas\", \"ADDRESS2\": null, \"CITY\": \"New York\", \"ZIP\": 10036.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.983836726071942, 40.756021151222583 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Intrepid Sea-Air-Space Museum\", \"TEL\": \"(212) 245-0072\", \"URL\": \"http:\\/\\/www.intrepidmuseum.org\\/\", \"ADRESS1\": \"Pier 86 12th Ave. & 46th Street\", \"ADDRESS2\": null, \"CITY\": \"New York\", \"ZIP\": 10036.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -74.000891806412838, 40.76478327394166 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Isamu Noguchi Garden Museum\", \"TEL\": \"(718) 204-7088\", \"URL\": \"http:\\/\\/www.noguchi.org\\/\", \"ADRESS1\": \"32-37 Vernon Boulevard\", \"ADDRESS2\": null, \"CITY\": \"Long Island City\", \"ZIP\": 11106.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.937655145038264, 40.766956613052493 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Italian American Museum\", \"TEL\": \"(212) 965-9000\", \"URL\": \"http:\\/\\/www.italianamericanmuseum.org\\/\", \"ADRESS1\": \"155 Mulberry St.\", \"ADDRESS2\": null, \"CITY\": \"New York\", \"ZIP\": 10013.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.997494106875692, 40.719194628210467 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Jackie Robinson Museum\", \"TEL\": \"(212) 290-8600\", \"URL\": \"http:\\/\\/www.jackierobinson.org\\/\", \"ADRESS1\": \"1 Hudson Square\", \"ADDRESS2\": \"75 Varick Street 2nd Floor\", \"CITY\": \"New York\", \"ZIP\": 10013.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -74.006641855163494, 40.723350662253765 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Jacques Marchais Center Museum of Tibetan Art\", \"TEL\": \"(718) 987-3500\", \"URL\": \"http:\\/\\/www.tibetanmuseum.org\\/\", \"ADRESS1\": \"338 Lighthouse Avenue\", \"ADDRESS2\": null, \"CITY\": \"Staten Island\", \"ZIP\": 10306.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -74.138123365825436, 40.576312835305579 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Jeffrey's Hook lighthouse (Little Red Lighthouse)\", \"TEL\": \"(212) 304-2365\", \"URL\": \"http:\\/\\/www.nycgovparks.org\\/sub_about\\/parks_divisions\\/historic_houses\\/hh_little_red_light.html\", \"ADRESS1\": \"178th Street at the Hudson River\", \"ADDRESS2\": null, \"CITY\": \"New York\", \"ZIP\": 10033.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.946944945147209, 40.850220034849137 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Jewish Museum\", \"TEL\": \"(212) 423-3200\", \"URL\": \"http:\\/\\/www.thejewishmuseum.org\\/index.php\", \"ADRESS1\": \"1109 Fifth Ave\", \"ADDRESS2\": null, \"CITY\": \"New York\", \"ZIP\": 10128.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.957187059310513, 40.785402256425385 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"John J. Harvey Fireboat\", \"TEL\": null, \"URL\": \"http:\\/\\/www.fireboat.org\\/\", \"ADRESS1\": \"Pier 66 at West 26th Street\", \"ADDRESS2\": null, \"CITY\": \"New York\", \"ZIP\": 10001.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -74.00965483733566, 40.752330197327574 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"King Manor Museum\", \"TEL\": \"(718) 206-0545\", \"URL\": \"http:\\/\\/www.kingmanor.org\\/\", \"ADRESS1\": \"152-01 Jamaica Avenue\", \"ADDRESS2\": null, \"CITY\": \"Queens\", \"ZIP\": 11432.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.803760620635174, 40.703042019259726 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Kingsland Homestead\", \"TEL\": \"(718) 206-0545\", \"URL\": \"http:\\/\\/www.queenshistoricalsociety.org\\/kingsland.html\", \"ADRESS1\": \"143-35 37th Avenue\", \"ADDRESS2\": null, \"CITY\": \"Queens\", \"ZIP\": 11354.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.824156418899278, 40.763595705057078 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"LaGuardia and Wagner Archives\", \"TEL\": \"(718) 482-5065\", \"URL\": \"http:\\/\\/www.laguardiawagnerarchive.lagcc.cuny.edu\\/defaultc.htm\", \"ADRESS1\": \"31-10 Thomson Ave.\", \"ADDRESS2\": \"Fiorello H. LaGuardia Community College\\/CUNY Room E-238\", \"CITY\": \"Queens\", \"ZIP\": 11101.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.935145679995685, 40.743960072462592 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Lee Young Hee Museum of Korean Culture\", \"TEL\": \"(212) 560-0722\", \"URL\": \"http:\\/\\/www.lyhkm.org\\/\", \"ADRESS1\": \"2 West 32nd Street\", \"ADDRESS2\": \"Suite 301\", \"CITY\": \"New York\", \"ZIP\": 10001.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.986188330582863, 40.7471970949724 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Lefferts Historic House\", \"TEL\": \"(718) 789-2822\", \"URL\": \"http:\\/\\/www.prospectpark.org\\/visit\\/places\\/lefferts\", \"ADRESS1\": \"Prospect Park Willink Entrance\", \"ADDRESS2\": \"Flatbush and Ocean Avenues and Empire Boulevard\", \"CITY\": \"Brooklyn\", \"ZIP\": 11215.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.963814161252358, 40.664379955949848 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Madame Tussauds Wax Museum\", \"TEL\": \"(800) 246-8872\", \"URL\": \"http:\\/\\/www.madametussauds.com\\/NewYork\\/\", \"ADRESS1\": \"234 W. 42nd Street\", \"ADDRESS2\": null, \"CITY\": \"New York\", \"ZIP\": 10036.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.988702261400519, 40.756318163057969 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Merchant's House Museum\", \"TEL\": \"(212) 777-1089\", \"URL\": \"http:\\/\\/www.merchantshouse.com\\/\", \"ADRESS1\": \"29 East Fourth Street\", \"ADDRESS2\": null, \"CITY\": \"New York\", \"ZIP\": 10003.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.992346047908711, 40.727657417245439 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Metropolitan Museum of Art (MET)\", \"TEL\": \"(212) 535-7710\", \"URL\": \"http:\\/\\/www.metmuseum.org\\/\", \"ADRESS1\": \"1000 Fifth Avenue\", \"ADDRESS2\": null, \"CITY\": \"New York\", \"ZIP\": 10028.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.963451111452684, 40.779423541990404 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Mexican Cultural Institute of New York\", \"TEL\": \"(212) 217-6422\", \"URL\": \"http:\\/\\/www.lavitrina.com\\/\", \"ADRESS1\": \"27 E. 39th St.\", \"ADDRESS2\": null, \"CITY\": \"New York\", \"ZIP\": 10016.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.979881179528888, 40.750784366783492 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Morgan Library and Museum\", \"TEL\": \"(212) 685-0008\", \"URL\": \"http:\\/\\/www.themorgan.org\\/home.asp\", \"ADRESS1\": \"225 Madison Avenue\", \"ADDRESS2\": null, \"CITY\": \"New York\", \"ZIP\": 10016.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.981321485615965, 40.749295072496693 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Morris-Jumel Mansion\", \"TEL\": \"(212) 923-8008\", \"URL\": \"http:\\/\\/www.morrisjumel.org\\/\", \"ADRESS1\": \"65 Jumel Terrace\", \"ADDRESS2\": null, \"CITY\": \"New York\", \"ZIP\": 10032.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.938574387927218, 40.834447679265431 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Mount Vernon Hotel Museum & Garden\", \"TEL\": \"(212) 838-6878\", \"URL\": \"http:\\/\\/www.mvhm.org\\/\", \"ADRESS1\": \"421 East 61 Street\", \"ADDRESS2\": null, \"CITY\": \"New York\", \"ZIP\": 10021.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.959710829281107, 40.760525784474162 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Municipal Art Society\", \"TEL\": \"(212) 935-3960\", \"URL\": \"http:\\/\\/mas.org\\/\", \"ADRESS1\": \"457 Madison Avenue\", \"ADDRESS2\": null, \"CITY\": \"New York\", \"ZIP\": 10022.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.974999870350572, 40.758248305307504 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Museum for African Art\", \"TEL\": \"(718) 784-7700\", \"URL\": \"http:\\/\\/www.africanart.org\\/\", \"ADRESS1\": \"36-01 43rd Avenue\", \"ADDRESS2\": \"3rd Floor\", \"CITY\": \"Queens\", \"ZIP\": 11101.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.928223911042821, 40.746341738272264 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Museum of American Finance\", \"TEL\": \"(212) 908-4110\", \"URL\": \"http:\\/\\/www.moaf.org\\/index\", \"ADRESS1\": \"48 Wall Street\", \"ADDRESS2\": null, \"CITY\": \"New York\", \"ZIP\": 10005.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -74.009121603942518, 40.706484588627951 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Museum of American Illustration\", \"TEL\": \"(212) 838-2560\", \"URL\": \"http:\\/\\/societyillustrators.org\\/museum\\/index.cms\", \"ADRESS1\": \"128 E. 63d St.\", \"ADDRESS2\": null, \"CITY\": \"New York\", \"ZIP\": 10021.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.966900309979408, 40.764715622443831 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Museum of Arts & Design (MAD)\", \"TEL\": \"(212) 299-7777\", \"URL\": \"http:\\/\\/www.madmuseum.org\\/\", \"ADRESS1\": \"2 Columbus Circle\", \"ADDRESS2\": null, \"CITY\": \"New York\", \"ZIP\": 10019.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.98200725142938, 40.767406073957403 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Museum of Biblical Art\", \"TEL\": \"(212) 408-1200\", \"URL\": \"http:\\/\\/www.mobia.org\\/\", \"ADRESS1\": \"1865 Broadway\", \"ADDRESS2\": null, \"CITY\": \"New York\", \"ZIP\": 10023.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.982725842355194, 40.770252409862358 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Museum Of Chinese In America\", \"TEL\": \"(212) 619-4785\", \"URL\": \"http:\\/\\/www.mocanyc.org\\/\", \"ADRESS1\": \"215 Centre Street\", \"ADDRESS2\": null, \"CITY\": \"New York\", \"ZIP\": 10013.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.999191919422259, 40.719453946338703 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Museum of Comic and Cartoon Art (MoCCA)\", \"TEL\": \"(212) 254 3511\", \"URL\": \"http:\\/\\/www.moccany.org\\/\", \"ADRESS1\": \"594 Broadway\", \"ADDRESS2\": \"Suite 401\", \"CITY\": \"New York\", \"ZIP\": 10012.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.99670247583488, 40.724797945642365 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Museum of Contemporary African Diasporan Arts (MoCADA)\", \"TEL\": \"(718) 230-0492\", \"URL\": \"http:\\/\\/www.mocada.org\\/\", \"ADRESS1\": \"80 Hanson Place\", \"ADDRESS2\": null, \"CITY\": \"Brooklyn\", \"ZIP\": 11217.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.97442477664778, 40.685245143830592 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Museum of Jewish Heritage\", \"TEL\": \"(646) 437-4200\", \"URL\": \"http:\\/\\/www.mjhnyc.org\\/index.htm\", \"ADRESS1\": \"36 Battery Place\", \"ADDRESS2\": null, \"CITY\": \"New York\", \"ZIP\": 10280.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -74.018585715886061, 40.705986647371191 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Museum of Modern Art (MoMA)\", \"TEL\": \"(212) 708-9400\", \"URL\": \"http:\\/\\/www.moma.org\\/\", \"ADRESS1\": \"11 West 53rd Street\", \"ADDRESS2\": null, \"CITY\": \"New York\", \"ZIP\": 10019.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.977003631520802, 40.761186641024452 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Museum of the City of New York\", \"TEL\": \"(212) 534-1672\", \"URL\": \"http:\\/\\/www.mcny.org\", \"ADRESS1\": \"1220 Fifth Avenue\", \"ADDRESS2\": null, \"CITY\": \"New York\", \"ZIP\": 10029.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.951916974628801, 40.792509034509976 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Museum of the Moving Image\", \"TEL\": \"(718) 784-4520\", \"URL\": \"http:\\/\\/www.movingimage.us\\/site\\/site.php\", \"ADRESS1\": \"35 Avenue at 36 Street\", \"ADDRESS2\": null, \"CITY\": \"Queens\", \"ZIP\": 11106.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.924510172521863, 40.756944487412355 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"National Academy Museum\", \"TEL\": \"(212) 369-4880\", \"URL\": \"https:\\/\\/nationalacademy.org\\/index.asp\", \"ADRESS1\": \"1083 5th Avenue\", \"ADDRESS2\": null, \"CITY\": \"New York\", \"ZIP\": 10128.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.958491773692089, 40.783613167204031 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"National Lighthouse Museum\", \"TEL\": \"(718) 556-1681\", \"URL\": \"http:\\/\\/statenislandusa.com\\/pages\\/lighthouse.html\", \"ADRESS1\": \"1 Lighthouse Plaza\", \"ADDRESS2\": null, \"CITY\": \"Staten Island\", \"ZIP\": 10301.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -74.073737130575992, 40.640949015579828 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"National Museum of the American Indian\", \"TEL\": \"(212) 514-3700\", \"URL\": \"http:\\/\\/www.nmai.si.edu\\/\", \"ADRESS1\": \"1 Bowling Green\", \"ADDRESS2\": null, \"CITY\": \"New York\", \"ZIP\": 10004.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -74.013727045981952, 40.704321256985999 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"National September 11 Memorial & Museum at the World Trade Center\", \"TEL\": \"(212) 227-7722\", \"URL\": \"http:\\/\\/www.911memorial.org\\/\", \"ADRESS1\": \"1 Liberty Plaza\", \"ADDRESS2\": \"20th Floor\", \"CITY\": \"New York\", \"ZIP\": 10006.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -74.01091566131096, 40.709654487477898 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Neue Galerie New York\", \"TEL\": \"(212) 628-6200\", \"URL\": \"http:\\/\\/www.neuegalerie.org\\/\", \"ADRESS1\": \"1048 Fifth Avenue\", \"ADDRESS2\": null, \"CITY\": \"New York\", \"ZIP\": 10028.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.960248126063092, 40.781242335837774 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"New Museum of Contemporary Art\", \"TEL\": \"(212) 219-1222\", \"URL\": \"http:\\/\\/www.newmuseum.org\\/\", \"ADRESS1\": \"235 Bowery\", \"ADDRESS2\": null, \"CITY\": \"New York\", \"ZIP\": 10002.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.992838792500677, 40.722346701845439 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"New York City Fire Museum\", \"TEL\": \"(212) 691-1303\", \"URL\": \"http:\\/\\/www.nycfiremuseum.org\\/\", \"ADRESS1\": \"278 Spring Street\", \"ADDRESS2\": null, \"CITY\": \"New York\", \"ZIP\": 10012.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -74.006934260941634, 40.725571805839934 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"New York City Police Museum\", \"TEL\": \"(212) 480-3100\", \"URL\": \"http:\\/\\/www.nycpolicemuseum.org\\/\", \"ADRESS1\": \"100 Old Slip\", \"ADDRESS2\": null, \"CITY\": \"New York\", \"ZIP\": 10038.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -74.008117544018972, 40.703478290827405 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"New York Hall of Science\", \"TEL\": \"(718) 699-0005\", \"URL\": \"http:\\/\\/www.nysci.org\\/\", \"ADRESS1\": \"47-01 111th Street\", \"ADDRESS2\": null, \"CITY\": \"Queens\", \"ZIP\": 11368.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.851686795685566, 40.747147787858133 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"New York Historical Society\", \"TEL\": \"(212) 873-3400\", \"URL\": \"https:\\/\\/www.nyhistory.org\\/web\\/\", \"ADRESS1\": \"2 West 77th Street\", \"ADDRESS2\": null, \"CITY\": \"New York\", \"ZIP\": 10024.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.974257538445684, 40.779273241393419 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"New York Tolerance Center\", \"TEL\": \"(212) 697-1180\", \"URL\": \"http:\\/\\/www.kintera.org\\/site\\/pp.asp?c=fwLYKnN8LzH&b=242506\", \"ADRESS1\": \"50 E 42nd St\", \"ADDRESS2\": null, \"CITY\": \"New York\", \"ZIP\": 10017.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.979124112391347, 40.752422920262056 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"New York Transit Museum\", \"TEL\": \"(718) 694-4915\", \"URL\": \"http:\\/\\/www.mta.info\\/mta\\/museum\\/\", \"ADRESS1\": \"Boerum Pl. & Schermenhorn Street\", \"ADDRESS2\": null, \"CITY\": \"Brooklyn\", \"ZIP\": 0.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.990025971318246, 40.690523698126313 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Nicholas Roerich Museum\", \"TEL\": \"(212) 864-7752\", \"URL\": \"http:\\/\\/www.roerich.org\\/\", \"ADRESS1\": \"319 West 107 Street\", \"ADDRESS2\": null, \"CITY\": \"New York\", \"ZIP\": 10025.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.969022497233297, 40.802913999614148 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Noble Maritime Collection\", \"TEL\": \"(718) 447-6490\", \"URL\": \"http:\\/\\/www.noblemaritime.org\\/\", \"ADRESS1\": \"1000 Richmond Terrace\", \"ADDRESS2\": null, \"CITY\": \"Staten Island\", \"ZIP\": 10301.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -74.101772036305917, 40.644311944423841 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Old Stone House\", \"TEL\": \"(718) 768-3195\", \"URL\": \"http:\\/\\/www.theoldstonehouse.org\\/\", \"ADRESS1\": \"326 5th Avenue\", \"ADDRESS2\": null, \"CITY\": \"Brooklyn\", \"ZIP\": 11215.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.984618614683811, 40.672993473207157 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"P.S. 1 Contemporary Art Center\", \"TEL\": \"(718) 784-2084\", \"URL\": \"http:\\/\\/www.ps1.org\\/\", \"ADRESS1\": \"22-25 Jackson Ave.\", \"ADDRESS2\": null, \"CITY\": \"Queens\", \"ZIP\": 11101.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.946212417927896, 40.745839468634884 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Paley Center For Media (formerly Museum Of Television & Radio)\", \"TEL\": \"(212) 621-6800\", \"URL\": \"http:\\/\\/www.paleycenter.org\\/\", \"ADRESS1\": \"25 West 52 Street\", \"ADDRESS2\": null, \"CITY\": \"New York\", \"ZIP\": 10019.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.97760161381045, 40.760573638591993 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Queens Art Museum - Bulova Corporate Center\", \"TEL\": \"(516) 624-1910\", \"URL\": \"http:\\/\\/www.bdg.net\\/properties\\/1\\/\", \"ADRESS1\": \"75-20 Astoria Blvd.\", \"ADDRESS2\": null, \"CITY\": \"Jackson Heights\", \"ZIP\": 11386.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.893148456186154, 40.764607255456205 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Queens County Farm Museum\", \"TEL\": \"(718) 347-3276\", \"URL\": \"http:\\/\\/www.queensfarm.org\\/\", \"ADRESS1\": \"73-50 Little Neck Parkway\", \"ADDRESS2\": null, \"CITY\": \"Queens\", \"ZIP\": 11004.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.725736608616671, 40.745569604291134 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Queens Museum of Art\", \"TEL\": \"(718) 592-9700\", \"URL\": \"http:\\/\\/www.queensmuseum.org\\/\", \"ADRESS1\": \"Queens Museum of Art\", \"ADDRESS2\": \"Flushing Meadows Corona Park\", \"CITY\": \"Queens\", \"ZIP\": 11368.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.846762758177846, 40.745842864749385 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Rose Center for Earth and Space (Hayden Planetarium)\", \"TEL\": \"(212) 769-5100\", \"URL\": \"http:\\/\\/www.haydenplanetarium.org\\/index.php\", \"ADRESS1\": \"15 West 81st Street\", \"ADDRESS2\": null, \"CITY\": \"New York\", \"ZIP\": 10024.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.972574910676414, 40.782859832212608 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Rose Museum at Carnegie Hall\", \"TEL\": \"(212) 903-9629\", \"URL\": \"http:\\/\\/www.carnegiehall.org\\/textSite\\/the_basics\\/art_museum_archives.html\", \"ADRESS1\": \"154 West 57th Street\", \"ADDRESS2\": null, \"CITY\": \"New York\", \"ZIP\": 0.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.97991050357534, 40.765012313344059 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Rubin Museum of Art\", \"TEL\": \"(212) 620-5000\", \"URL\": \"http:\\/\\/www.rmanyc.org\\/\", \"ADRESS1\": \"150 West 17th Street\", \"ADDRESS2\": null, \"CITY\": \"New York\", \"ZIP\": 10011.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.997791525349157, 40.740020380141495 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Sandy Ground Historical Society\", \"TEL\": \"(718) 317-5796\", \"URL\": \"http:\\/\\/statenislandusa.com\\/pages\\/sandy_ground.html\", \"ADRESS1\": \"1538 Woodrow Road\", \"ADDRESS2\": null, \"CITY\": \"Staten Island\", \"ZIP\": 0.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -74.216502819891232, 40.540978354775262 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Scandinavia House: The Nordic Center in America\", \"TEL\": \"(212) 879-9779\", \"URL\": \"http:\\/\\/www.scandinaviahouse.org\\/\", \"ADRESS1\": \"58 Park Ave.\", \"ADDRESS2\": null, \"CITY\": \"New York\", \"ZIP\": 10016.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.980088435385198, 40.749446895679625 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Schomburg Center for Research in Black Culture\", \"TEL\": \"(212) 491-2200\", \"URL\": \"http:\\/\\/www.nypl.org\\/research\\/sc\\/sc.html\", \"ADRESS1\": \"515 Malcolm X Boulevard\", \"ADDRESS2\": null, \"CITY\": \"New York\", \"ZIP\": 10037.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.940990760531591, 40.814612726277637 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"School of Visual Arts Museum\", \"TEL\": \"(212) 592-2145\", \"URL\": \"http:\\/\\/www.schoolofvisualarts.edu\\/sa\\/index.jsp?sid0=201&page_id=482&event_id=865\", \"ADRESS1\": \"209 E. 23rd St.\", \"ADDRESS2\": null, \"CITY\": \"New York\", \"ZIP\": 10010.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.982242325600595, 40.738759190995218 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Seguine Mansion\", \"TEL\": \"(718) 667-6042\", \"URL\": \"http:\\/\\/www.historichousetrust.org\\/item.php?i_id=38\", \"ADRESS1\": \"440 Seguine Avenue\", \"ADDRESS2\": null, \"CITY\": \"Staten Island\", \"ZIP\": 10307.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -74.197589298419061, 40.515214343643329 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Skyscraper Museum\", \"TEL\": \"(212) 968-1961\", \"URL\": \"http:\\/\\/www.skyscraper.org\\/home.htm\", \"ADRESS1\": \"39 Battery Place\", \"ADDRESS2\": null, \"CITY\": \"New York\", \"ZIP\": 10280.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -74.017568068330633, 40.705657529779721 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Solomon R. Guggenheim Museum\", \"TEL\": \"(212) 423-3500\", \"URL\": \"http:\\/\\/www.guggenheim.org\\/\", \"ADRESS1\": \"1071 Fifth Avenue\", \"ADDRESS2\": null, \"CITY\": \"New York\", \"ZIP\": 10128.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.958911020405822, 40.783009476184979 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Sony Wonder Technology Lab\", \"TEL\": \"(212) 833-8100\", \"URL\": \"http:\\/\\/wondertechlab.sony.com\\/\", \"ADRESS1\": \"550 Madison Ave\", \"ADDRESS2\": \"Sony Plaza\", \"CITY\": \"New York\", \"ZIP\": 10022.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.973507821053545, 40.761470301018683 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"South Street Seaport Museum\", \"TEL\": \"(212) 748-8600\", \"URL\": \"http:\\/\\/www.southstreetseaportmuseum.org\\/\", \"ADRESS1\": \"12 Fulton Street\", \"ADDRESS2\": null, \"CITY\": \"New York\", \"ZIP\": 10038.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -74.003720940575704, 40.706603357568916 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Staten Island Children's Museum\", \"TEL\": \"(718) 273-2060\", \"URL\": \"http:\\/\\/www.statenislandkids.org\\/\", \"ADRESS1\": \"1000 Richmond Terr.\", \"ADDRESS2\": null, \"CITY\": \"Staten Island\", \"ZIP\": 10301.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -74.101892105181278, 40.642708882248073 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Staten Island Museum \\/ Staten Island Institute of Arts & Sciences\", \"TEL\": \"(718) 727-1135\", \"URL\": \"http:\\/\\/www.statenislandmuseum.org\\/\", \"ADRESS1\": \"75 Stuyvesant Pl.\", \"ADDRESS2\": null, \"CITY\": \"Staten Island\", \"ZIP\": 10301.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -74.077665062692162, 40.644369178600918 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Studio Museum in Harlem\", \"TEL\": \"(212) 864-4500\", \"URL\": \"http:\\/\\/www.studiomuseum.org\", \"ADRESS1\": \"144 West 125th Street\", \"ADDRESS2\": null, \"CITY\": \"New York\", \"ZIP\": 10027.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.947726154701854, 40.80824547616804 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Tenement Museum\", \"TEL\": \"(212) 431-0233\", \"URL\": \"http:\\/\\/www.tenement.org\\/\", \"ADRESS1\": \"108 Orchard Street\", \"ADDRESS2\": null, \"CITY\": \"New York\", \"ZIP\": 10002.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.989679048249073, 40.718687698398952 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"The Freakatorium, El Museo Loco\", \"TEL\": \"(212) 375-0475\", \"URL\": \"http:\\/\\/www.freakatorium.com\\/\", \"ADRESS1\": \"57 Clinton St.\", \"ADDRESS2\": null, \"CITY\": \"New York\", \"ZIP\": 10002.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.985014489824465, 40.719616728018607 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"The Jazz Museum in Harlem\", \"TEL\": \"(212) 348-8300\", \"URL\": \"http:\\/\\/www.jazzmuseuminharlem.org\\/\", \"ADRESS1\": \"104 E. 126th Street\", \"ADDRESS2\": \"Suite 2D\", \"CITY\": \"New York\", \"ZIP\": 10035.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.938058741761438, 40.805276384357875 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"The Jewish Children's Museum\", \"TEL\": \"(718) 467-0600\", \"URL\": \"http:\\/\\/www.jcmonline.org\\/\", \"ADRESS1\": \"792 Eastern Pkwy\", \"ADDRESS2\": null, \"CITY\": \"Brooklyn\", \"ZIP\": 11213.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.941961770063145, 40.668911577324934 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"The Museum at FIT\", \"TEL\": \"(212) 217-5800\", \"URL\": \"http:\\/\\/www.fitnyc.edu\\/306.asp\", \"ADRESS1\": \"7th Avenue at West 27th Street\", \"ADDRESS2\": null, \"CITY\": \"New York\", \"ZIP\": 10001.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.99392966775828, 40.747008375827249 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Theodore Roosevelt Birthplace\", \"TEL\": \"(212) 260-1616\", \"URL\": \"http:\\/\\/www.nps.gov\\/thrb\\/index.htm\", \"ADRESS1\": \"28 East 20th Street\", \"ADDRESS2\": null, \"CITY\": \"New York\", \"ZIP\": 10003.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.98904085250436, 40.738642014511228 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Ukrainian Museum\", \"TEL\": \"(212) 228-0110\", \"URL\": \"http:\\/\\/www.ukrainianmuseum.org\\/\", \"ADRESS1\": \"222 East 6th Street\", \"ADDRESS2\": null, \"CITY\": \"New York\", \"ZIP\": 10003.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.989757030787757, 40.72767678769965 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Valentine-Varian House\", \"TEL\": \"(718) 881-8900\", \"URL\": \"http:\\/\\/www.museumregister.com\\/US\\/NewYork\\/Bronx\\/ValentineVarianHouse\\/Info.html\", \"ADRESS1\": \"3266 Bainbridge Ave.\", \"ADDRESS2\": null, \"CITY\": \"Bronx\", \"ZIP\": 10467.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.879424718495898, 40.877379824668665 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Van Cortlandt House Museum\", \"TEL\": \"(718) 543-3344\", \"URL\": \"http:\\/\\/www.vancortlandthouse.org\\/\", \"ADRESS1\": \"VAN CRTLANDT MANSION\", \"ADDRESS2\": \"Broadway at West 246th Street\", \"CITY\": \"Bronx\", \"ZIP\": 10471.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.894822570253069, 40.891111167291399 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Wave Hill\", \"TEL\": \"(718) 549-3200\", \"URL\": \"http:\\/\\/wavehill.org\\/visit\\/\", \"ADRESS1\": \"West 249th Street & Independence Avenue\", \"ADDRESS2\": null, \"CITY\": \"Bronx\", \"ZIP\": 10471.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.911653765747118, 40.89788471476033 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Whitney Museum of American Art\", \"TEL\": \"1 (800) WHITNEY\", \"URL\": \"http:\\/\\/www.whitney.org\\/\", \"ADRESS1\": \"945 Madison Ave.\", \"ADDRESS2\": null, \"CITY\": \"New York\", \"ZIP\": 10021.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.963834347361896, 40.773407292902149 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Wyckoff Farmhouse Museum\", \"TEL\": \"(718) 629-5400\", \"URL\": \"http:\\/\\/www.wyckoffassociation.org\\/\", \"ADRESS1\": \"5816 Clarendon Ave\", \"ADDRESS2\": null, \"CITY\": \"Brooklyn\", \"ZIP\": 11203.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.920796299063014, 40.644340681393338 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Leo Baeck Institute\", \"TEL\": \"(212) 744-6400\", \"URL\": \"http:\\/\\/www.lbi.org\\/\", \"ADRESS1\": \"15 W. 16th St.\", \"ADDRESS2\": null, \"CITY\": \"New York\", \"ZIP\": 10011.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.993764493638963, 40.738027542974095 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"American Sephardi Federation \\/ Sephardic House\", \"TEL\": \"(212) 294-8350\", \"URL\": \"http:\\/\\/www.americansephardifederation.org\\/\", \"ADRESS1\": \"15 W. 16th St.\", \"ADDRESS2\": null, \"CITY\": \"New York\", \"ZIP\": 10011.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.993885796583129, 40.738077233178096 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"YIVO Institute for Jewish Research\", \"TEL\": \"(212) 246-6860\", \"URL\": \"http:\\/\\/www.yivoinstitute.org\\/\", \"ADRESS1\": \"15 W. 16th St.\", \"ADDRESS2\": null, \"CITY\": \"New York\", \"ZIP\": 10011.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.993794272453229, 40.737959947086509 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"American Jewish Historical Society\", \"TEL\": \"(212) 294-6160\", \"URL\": \"http:\\/\\/www.ajhs.org\\/\", \"ADRESS1\": \"15 W. 16th St.\", \"ADDRESS2\": null, \"CITY\": \"New York\", \"ZIP\": 10011.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.993928904210506, 40.738015384101402 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Yeshiva University Museum\", \"TEL\": \"(212) 294-8330\", \"URL\": \"http:\\/\\/www.yumuseum.org\\/\", \"ADRESS1\": \"15 W. 16th St.\", \"ADDRESS2\": null, \"CITY\": \"New York\", \"ZIP\": 10011.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.993817370496259, 40.73804568384697 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Center For Jewish History\", \"TEL\": \"(212) 294-8301\", \"URL\": \"http:\\/\\/www.cjh.org\", \"ADRESS1\": \"15 W. 16th St.\", \"ADDRESS2\": null, \"CITY\": \"New York\", \"ZIP\": 10011.000000 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -73.993868772239722, 40.737986764588371 ] } }\r\n]\r\n}"), 'museum');
dataBuilder(JSON.parse("{\r\n\"type\": \"FeatureCollection\",\r\n\"crs\": { \"type\": \"name\", \"properties\": { \"name\": \"urn:ogc:def:crs:OGC:1.3:CRS84\" } },\r\n                                                                                \r\n\"features\": [\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Kroma Gallery\", \"TEL\": \"305.446.5150\", \"URL\": \"www.kromamiami.com\", \"ADDRESS1\": \"3670 Grand Avenue\", \"ADDRESS2\": null, \"CITY\": \"Coconut Grove\", \"ZIP\": 33133 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -80.252996, 25.727588  ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Little Haiti Cultural Center\", \"TEL\": \"305.960.2969\", \"URL\": \"www.littlehaiticulturalcenter.com\", \"ADDRESS1\": \"212 NE 59 Terrace, Miami, Fl 33137\", \"ADDRESS2\": null, \"CITY\": \"Miami\", \"ZIP\": 33137 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -80.191310, 25.830387  ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Yeelen Art Gallery\", \"TEL\": \"954.235.4758\", \"URL\": \"www.yeelenart.com\", \"ADDRESS1\": \"294 NW 54 Street\", \"ADDRESS2\": null, \"CITY\": \"Miami\", \"ZIP\": 33137 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -80.201863, 25.824827 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"The Caribbean Marketplace\", \"TEL\": \"\", \"URL\": \"\", \"ADDRESS1\": \"5925 NW 2 Avenue\", \"ADDRESS2\": null, \"CITY\": \"Miami\", \"ZIP\": 33137 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -80.201863, 25.824827 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Chef Creole\", \"TEL\": \"305.754.2223\", \"URL\": \"www.muce305.com\", \"ADDRESS1\": \"200 NW 54 Street\", \"ADDRESS2\": null, \"CITY\": \"Miami\", \"ZIP\": 33127 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -80.200256, 25.824914  ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Viernes Culturales Futurama Building\", \"TEL\": \"305.643.5500\", \"URL\": \"http://viernesculturales.org/mainvc/\", \"ADDRESS1\": \"1637 SW 8 St., Miami, FL 33127\", \"ADDRESS2\": null, \"CITY\": \"Miami\", \"ZIP\": 33127 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -80.221644, 25.765836  ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Arts and Recreation Center\", \"TEL\": \"305.687.3545\", \"URL\": \"www.opalockaart.com\", \"ADDRESS1\": \"675 Ali Baba Avenue\", \"ADDRESS2\": null, \"CITY\": \"Opa-Locka\", \"ZIP\": 33054 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -80.251916, 25.901287 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"The Black Archives Lyric Theater\", \"TEL\": \"786.708.4610\", \"URL\": \"http://www.bahlt.org/\", \"ADDRESS1\": \"819 NW 2 Avenue\", \"ADDRESS2\": null, \"CITY\": \"Miami\", \"ZIP\": 33136 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -80.197763, 25.782078 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Historic Ward Cultural Tourist Gallery\", \"TEL\": \"\", \"URL\": \"\", \"ADDRESS1\": \"249 NW 9 Street\", \"ADDRESS2\": null, \"CITY\": \"Miami\", \"ZIP\": 33136 }, \"geometry\": { \"type\": \"Point\", \"coordinates\":   [ -80.197763, 25.782078 ]} },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Betty Ferguson Recreational Complex\", \"TEL\": \"786.279.1222\", \"URL\": \"www.afropolis.us\", \"ADDRESS1\": \"3000 NW 199 Street\", \"ADDRESS2\": null, \"CITY\": \"Miami Gardens\", \"ZIP\": 33056 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -80.252182, 25.954397 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Museum of Contemporary Art\", \"TEL\": \"305.893.6211\", \"URL\": \"http://mocanomi.org/\", \"ADDRESS1\": \"770 NE 125 Street\", \"ADDRESS2\": null, \"CITY\": \"Miami\", \"ZIP\": 33161 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -80.182965, 25.889711 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"Thunder & Lightening Mural\", \"TEL\": \"\", \"URL\": \"\", \"ADDRESS1\": \"3275 NW 79 Street\", \"ADDRESS2\": null, \"CITY\": \"Miami\", \"ZIP\": 33142 }, \"geometry\": { \"type\": \"Point\", \"coordinates\":  [ -80.182965, 25.889711 ]} },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"African Heritage Cultural Arts Center\", \"TEL\": \"305.638.6771\", \"URL\": \"https://www.ahcacmiami.org/\", \"ADDRESS1\": \"6161 NW 22 Avenue\", \"ADDRESS2\": null, \"CITY\": \"Miami\", \"ZIP\": 33142 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -80.232758, 25.831058  ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"N'Namdi Contemporary Fine Art Gallery\", \"TEL\": \"786.332.4736\", \"URL\": \"http://nnamdicontemporary.com/\", \"ADDRESS1\": \"177 NW 23 Street\", \"ADDRESS2\": null, \"CITY\": \"Miami\", \"ZIP\": 33127 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -80.198809, 25.799254 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"All Soul's Episcopal Center\", \"TEL\": \"305.520.5410\", \"URL\": \"www.allsoulsmb.org\", \"ADDRESS1\": \"4025 Pine Tree Drive\", \"ADDRESS2\": null, \"CITY\": \"Miami Beach\", \"ZIP\": 33139 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -80.126049, 25.813047 ] } },\r\n{ \"type\": \"Feature\", \"properties\": { \"NAME\": \"History Miami Museum\", \"TEL\": \"305.375.1492\", \"URL\": \"www.historymiami.org\", \"ADDRESS1\": \"101 West Flagler Street\", \"ADDRESS2\": null, \"CITY\": \"Miami\", \"ZIP\": 33130 }, \"geometry\": { \"type\": \"Point\", \"coordinates\": [ -80.196287, 25.774537 ] } }\r\n]\r\n}"), 'theatre');


// Layer style
var dataStyle = JSON.parse("[\r\n  {\r\n    \"id\": \"poi-museum\",\r\n    \"interactive\": true,\r\n    \"type\": \"symbol\",\r\n    \"source\": \"geojson\",\r\n    \"filter\": [\r\n      \"all\",\r\n      [\"in\", \"type\", \"museum\"]\r\n    ],\r\n    \"layout\": {\r\n      \"icon-image\": \"{type}\",\r\n      \"icon-allow-overlap\": true\r\n    }\r\n  },\r\n  {\r\n    \"id\": \"poi-theatre\",\r\n    \"interactive\": true,\r\n    \"type\": \"symbol\",\r\n    \"source\": \"geojson\",\r\n    \"filter\": [\r\n      \"all\",\r\n      [\"in\", \"type\", \"theatre\"]\r\n    ],\r\n    \"layout\": {\r\n      \"icon-image\": \"{type}\",\r\n      \"icon-allow-overlap\": true\r\n    }\r\n  },\r\n  {\r\n    \"id\": \"poi-music\",\r\n    \"interactive\": true,\r\n    \"type\": \"symbol\",\r\n    \"source\": \"geojson\",\r\n    \"filter\": [\r\n      \"all\",\r\n      [\"in\", \"type\", \"music\"]\r\n    ],\r\n    \"layout\": {\r\n      \"icon-image\": \"{type}\",\r\n      \"icon-allow-overlap\": true\r\n    }\r\n  },\r\n  {\r\n    \"id\": \"poi-art\",\r\n    \"interactive\": true,\r\n    \"type\": \"symbol\",\r\n    \"source\": \"geojson\",\r\n    \"filter\": [\r\n      \"all\",\r\n      [\"in\", \"type\", \"art\"]\r\n    ],\r\n    \"layout\": {\r\n      \"icon-image\": \"{type}\",\r\n      \"icon-allow-overlap\": true\r\n    }\r\n  }\r\n]");

var pois = ['poi-art', 'poi-music', 'poi-theatre', 'poi-museum'];


function phoneFormatted(phone) {
  return phone
    .toLowerCase()
    .replace(/[abc]/g, 2)
    .replace(/[def]/g, 3)
    .replace(/[ghi]/g, 4)
    .replace(/[jkl]/g, 5)
    .replace(/[mno]/g, 6)
    .replace(/[pqrs]/g, 7)
    .replace(/[tuv]/g, 8)
    .replace(/[wxyz]/g, 9)
    .replace(/\D/g, '');
}

function dataBuilder(gj, type) {
  gj.features.forEach(function(feature) {
    feature.properties.type = type;
    if (feature.properties.TEL) {
      feature.properties.phoneformatted = phoneFormatted(feature.properties.TEL);
    }
    data.push(feature);
  });
}

// Set bounds to Miami
var bounds = [
  [-80.547011, 25.611021], // Southwest coordinates
  [-79.828325, 26.024328]  // Northeast coordinates
];


var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/cika7lsg6003p9fm1y5eet742',
    hash: true,
    center: [-80.170099, 25.785522],
    zoom: 12,
    maxBounds: bounds
});



// Create a popup, but don't add it to the map yet.
var popup = new mapboxgl.Popup({
  closeButton: false
});

map.scrollZoom.disable();
map.addControl(new mapboxgl.Navigation({
  position: 'top-right'
}));

function addData() {
  map.addSource('geojson', {
    'type': 'geojson',
    'data': {
      'type': 'FeatureCollection',
      'features': data
    }
  });

  dataStyle.forEach(function(style) {
    map.addLayer(style);
  });
}

function buildListings(features) {
  var $listing = document.getElementById('listing');
  $listing.innerHTML = '';
  if (features.length) {
    features.forEach(function(feature) {
      var item = document.createElement('button');
      item.innerHTML = listingTemplate({ data: feature.properties });
      $listing.appendChild(item);

      item.addEventListener('click', function() {
        showPopup(feature);
      });
      item.addEventListener('mouseover', function() {
        showPopup(feature);
      });
      item.addEventListener('mouseout', function() {
        popup.remove();
      });
    });
  } else {
    var emptyState = document.createElement('div');
    emptyState.className = 'pad1 prose';
    emptyState.textContent = document.getElementById('legend').textContent;
    $listing.appendChild(emptyState);
  }
}

function showPopup(feature) {
  popup.setLngLat(feature.geometry.coordinates)
    .setHTML(feature.properties.NAME)
    .addTo(map);
}

function getFeatures() {
  var bbox = $svg.getBoundingClientRect();
  var center = {
     x: bbox.left + bbox.width / 2,
     y: bbox.top + bbox.height / 2
  };

  var radius = $svg.getAttribute('width') / 2;
  map.featuresAt({x: center.x, y: center.y}, {
    radius: radius,
    includeGeometry: true,
    layer: pois
  }, function(err, features) {
   if (err || !features.length) {
      popup.remove();
      return;
    }

    buildListings(features);
  });
}

function initialize() {
  var width = map.getContainer().clientWidth;
  var paper = new Raphael(width / 2, 100, 200, 200);
  $svg = paper.canvas;

  var circleStyle = {
    fill: '#59d9d4',
    stroke: '#59d9d4'
  };

  circleStyle['stroke-width'] = 3;
  circleStyle['fill-opacity'] = 0.1;

  var c = paper.circle(100, 100, 93).attr(circleStyle);
  

  // Canvas movement shaping
  function start() {
    // Store original coordinates
    this.parentOx = parseInt($svg.style.left, 10);
    this.parentOy = parseInt($svg.style.top, 10);
  }

  function move(dx, dy) {
    var x = this.parentOx + dx;
    var y = this.parentOy + dy;

    $svg.style.left = x;
    $svg.style.top = y;

    getFeatures();
  }

  c.hover(function() {
    document.body.style.cursor = 'move';
  }, function() {
    document.body.style.cursor = 'default';
  });

  c.drag(move, start);

  function zoomStart(e) {
    e.preventDefault();
    var delta = wheel(e, lastValue);
    lastValue = delta;

    var x = parseInt($svg.style.left, 10);
    var y = parseInt($svg.style.top, 10);
    var r = parseInt($svg.getAttribute('width'), 10);
    var radius = r + delta;
    if (radius <= 100) return;

    var left = x + -delta / 2;
    var top = y + -delta / 2;

    $svg.style.left = left;
    $svg.style.top = top;
    $svg.setAttribute('width', radius);
    $svg.setAttribute('height', radius);

    c.attr({
      r: ((radius / 2) - 3),
      cx: (radius / 2),
      cy: (radius / 2)
    });

    // Fetch map data
    getFeatures();
  }

  $svg.addEventListener('wheel', zoomStart, false);
  $svg.addEventListener('mousewheel', zoomStart, false);
}

map.once('source.change', function(ev) {
  if (ev.source.id !== 'geojson') return;

  window.setTimeout(getFeatures, 500);

  document.getElementById('filter-categories').addEventListener('change', function(e) {
    var id = 'poi-' + e.target.id;
    var display = (e.target.checked) ? 'visible' : 'none';
    map.setLayoutProperty(id, 'visibility', display);
    window.setTimeout(getFeatures, 500);
  });

  document.body.classList.remove('loading');
});

map.on('style.load', addData);
map.on('moveend', getFeatures);

map.on('click', function(e) {
  map.featuresAt(e.point, {
    radius: 7.5,
    includeGeometry: true,
    layer: pois
  }, function(err, features) {
    if (err || !features.length) {
      popup.remove();
      return;
    }

    showPopup(features[0]);
  });
});

map.on('mousemove', function(e) {
  map.featuresAt(e.point, {
    radius: 7.5,
    includeGeometry: true,
    layer: pois
  }, function(err, features) {
    map.getCanvas().style.cursor = (!err && features.length) ? 'pointer' : '';

    if (err || !features.length) {
      popup.remove();
      return;
    }

    showPopup(features[0]);
  });
});

function aobm(){
//map.setZoom(5);
map.flyTo({
  zoom: 5,
  speed: 1.2,
  curve: 1,
  easing: function(t) {
    return t;
  }
});
}

function miamibeach(){
map.flyTo({
  zoom: 12,
  center: [-80.131841, 25.804411],
  speed: 1.2,
  curve: 1,
  easing: function(t) {
    return t;
  }
});
}

function miamibeach(){
map.flyTo({
  zoom: 12,
  center: [-80.131841, 25.804411],
  speed: 1.2,
  curve: 1,
  easing: function(t) {
    return t;
  }
});
}

function wynwood(){
map.flyTo({
  zoom: 15,
  center: [-80.199057, 25.804994],
  speed: 1.2,
  curve: 1,
  easing: function(t) {
    return t;
  }
});
}

function midtown(){
map.flyTo({
  zoom: 15,
  center: [-80.192927, 25.807552],
  speed: 1.2,
  curve: 1,
  easing: function(t) {
    return t;
  }
});
}

function downtown(){
map.flyTo({
  zoom: 14,
  center: [-80.193625, 25.779384],
  speed: 1.2,
  curve: 1,
  easing: function(t) {
    return t;
  }
});
}

function all(){
map.flyTo({
  zoom: 4,
  center: [0, 0],
  speed: 1.2,
  curve: 1,
  easing: function(t) {
    return t;
  }
});
}


$('.all').click(all);
$('.miamibeach').click(miamibeach);
$('.wynwood').click(wynwood);
$('.midtown').click(midtown);
$('.downtown').click(downtown);
$('.aobm').click(aobm);

    


(initialize)();

},{"./wheel":19,"lodash.template":14,"path":16,"raphael":18}],2:[function(require,module,exports){
/**
 * lodash 3.0.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property names to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @returns {Object} Returns `object`.
 */
function baseCopy(source, props, object) {
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];
    object[key] = source[key];
  }
  return object;
}

module.exports = baseCopy;

},{}],3:[function(require,module,exports){
/**
 * lodash 3.0.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * Converts `value` to a string if it's not one. An empty string is returned
 * for `null` or `undefined` values.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  return value == null ? '' : (value + '');
}

module.exports = baseToString;

},{}],4:[function(require,module,exports){
/**
 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * The base implementation of `_.values` and `_.valuesIn` which creates an
 * array of `object` property values corresponding to the property names
 * returned by `keysFunc`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array} props The property names to get values for.
 * @returns {Object} Returns the array of property values.
 */
function baseValues(object, props) {
  var index = -1,
      length = props.length,
      result = Array(length);

  while (++index < length) {
    result[index] = object[props[index]];
  }
  return result;
}

module.exports = baseValues;

},{}],5:[function(require,module,exports){
/**
 * lodash 3.9.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** `Object#toString` result references. */
var funcTag = '[object Function]';

/** Used to detect host constructors (Safari > 5). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var fnToString = Function.prototype.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = object == null ? undefined : object[key];
  return isNative(value) ? value : undefined;
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in older versions of Chrome and Safari which return 'function' for regexes
  // and Safari 8 equivalents which return 'object' for typed array constructors.
  return isObject(value) && objToString.call(value) == funcTag;
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is a native function.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
 * @example
 *
 * _.isNative(Array.prototype.push);
 * // => true
 *
 * _.isNative(_);
 * // => false
 */
function isNative(value) {
  if (value == null) {
    return false;
  }
  if (isFunction(value)) {
    return reIsNative.test(fnToString.call(value));
  }
  return isObjectLike(value) && reIsHostCtor.test(value);
}

module.exports = getNative;

},{}],6:[function(require,module,exports){
/**
 * lodash 3.0.9 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** Used to detect unsigned integer values. */
var reIsUint = /^\d+$/;

/**
 * Used as the [maximum length](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

/**
 * Gets the "length" property value of `object`.
 *
 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
 * that affects Safari on at least iOS 8.1-8.3 ARM64.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {*} Returns the "length" value.
 */
var getLength = baseProperty('length');

/**
 * Checks if `value` is array-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 */
function isArrayLike(value) {
  return value != null && isLength(getLength(value));
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
  length = length == null ? MAX_SAFE_INTEGER : length;
  return value > -1 && value % 1 == 0 && value < length;
}

/**
 * Checks if the provided arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
      ? (isArrayLike(object) && isIndex(index, object.length))
      : (type == 'string' && index in object)) {
    var other = object[index];
    return value === value ? (value === other) : (other !== other);
  }
  return false;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength).
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

module.exports = isIterateeCall;

},{}],7:[function(require,module,exports){
/**
 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** Used to match template delimiters. */
var reInterpolate = /<%=([\s\S]+?)%>/g;

module.exports = reInterpolate;

},{}],8:[function(require,module,exports){
(function (global){
/**
 * lodash 3.0.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** Used to determine if values are of the language type `Object`. */
var objectTypes = {
  'function': true,
  'object': true
};

/** Detect free variable `exports`. */
var freeExports = (objectTypes[typeof exports] && exports && !exports.nodeType)
  ? exports
  : undefined;

/** Detect free variable `module`. */
var freeModule = (objectTypes[typeof module] && module && !module.nodeType)
  ? module
  : undefined;

/** Detect free variable `global` from Node.js. */
var freeGlobal = checkGlobal(freeExports && freeModule && typeof global == 'object' && global);

/** Detect free variable `self`. */
var freeSelf = checkGlobal(objectTypes[typeof self] && self);

/** Detect free variable `window`. */
var freeWindow = checkGlobal(objectTypes[typeof window] && window);

/** Detect `this` as the global object. */
var thisGlobal = checkGlobal(objectTypes[typeof this] && this);

/**
 * Used as a reference to the global object.
 *
 * The `this` value is used if it's the global object to avoid Greasemonkey's
 * restricted `window` object, otherwise the `window` object is used.
 */
var root = freeGlobal ||
  ((freeWindow !== (thisGlobal && thisGlobal.window)) && freeWindow) ||
    freeSelf || thisGlobal || Function('return this')();

/**
 * Checks if `value` is a global object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {null|Object} Returns `value` if it's a global object, else `null`.
 */
function checkGlobal(value) {
  return (value && value.Object === Object) ? value : null;
}

module.exports = root;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],9:[function(require,module,exports){
/**
 * lodash 3.2.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var root = require('lodash._root');

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to match HTML entities and HTML characters. */
var reUnescapedHtml = /[&<>"'`]/g,
    reHasUnescapedHtml = RegExp(reUnescapedHtml.source);

/** Used to map characters to HTML entities. */
var htmlEscapes = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '`': '&#96;'
};

/**
 * Used by `_.escape` to convert characters to HTML entities.
 *
 * @private
 * @param {string} chr The matched character to escape.
 * @returns {string} Returns the escaped character.
 */
function escapeHtmlChar(chr) {
  return htmlEscapes[chr];
}

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var Symbol = root.Symbol;

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolToString = Symbol ? symbolProto.toString : undefined;

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a string if it's not one. An empty string is returned
 * for `null` and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (value == null) {
    return '';
  }
  if (isSymbol(value)) {
    return Symbol ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

/**
 * Converts the characters "&", "<", ">", '"', "'", and "\`" in `string` to
 * their corresponding HTML entities.
 *
 * **Note:** No other characters are escaped. To escape additional
 * characters use a third-party library like [_he_](https://mths.be/he).
 *
 * Though the ">" character is escaped for symmetry, characters like
 * ">" and "/" don't need escaping in HTML and have no special meaning
 * unless they're part of a tag or unquoted attribute value.
 * See [Mathias Bynens's article](https://mathiasbynens.be/notes/ambiguous-ampersands)
 * (under "semi-related fun fact") for more details.
 *
 * Backticks are escaped because in IE < 9, they can break out of
 * attribute values or HTML comments. See [#59](https://html5sec.org/#59),
 * [#102](https://html5sec.org/#102), [#108](https://html5sec.org/#108), and
 * [#133](https://html5sec.org/#133) of the [HTML5 Security Cheatsheet](https://html5sec.org/)
 * for more details.
 *
 * When working with HTML you should always [quote attribute values](http://wonko.com/post/html-escaping)
 * to reduce XSS vectors.
 *
 * @static
 * @memberOf _
 * @category String
 * @param {string} [string=''] The string to escape.
 * @returns {string} Returns the escaped string.
 * @example
 *
 * _.escape('fred, barney, & pebbles');
 * // => 'fred, barney, &amp; pebbles'
 */
function escape(string) {
  string = toString(string);
  return (string && reHasUnescapedHtml.test(string))
    ? string.replace(reUnescapedHtml, escapeHtmlChar)
    : string;
}

module.exports = escape;

},{"lodash._root":8}],10:[function(require,module,exports){
/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

module.exports = isArguments;

},{}],11:[function(require,module,exports){
/**
 * lodash 3.0.4 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** `Object#toString` result references. */
var arrayTag = '[object Array]',
    funcTag = '[object Function]';

/** Used to detect host constructors (Safari > 5). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var fnToString = Function.prototype.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/* Native method references for those with the same name as other `lodash` methods. */
var nativeIsArray = getNative(Array, 'isArray');

/**
 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = object == null ? undefined : object[key];
  return isNative(value) ? value : undefined;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(function() { return arguments; }());
 * // => false
 */
var isArray = nativeIsArray || function(value) {
  return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
};

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in older versions of Chrome and Safari which return 'function' for regexes
  // and Safari 8 equivalents which return 'object' for typed array constructors.
  return isObject(value) && objToString.call(value) == funcTag;
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is a native function.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
 * @example
 *
 * _.isNative(Array.prototype.push);
 * // => true
 *
 * _.isNative(_);
 * // => false
 */
function isNative(value) {
  if (value == null) {
    return false;
  }
  if (isFunction(value)) {
    return reIsNative.test(fnToString.call(value));
  }
  return isObjectLike(value) && reIsHostCtor.test(value);
}

module.exports = isArray;

},{}],12:[function(require,module,exports){
/**
 * lodash 3.1.2 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var getNative = require('lodash._getnative'),
    isArguments = require('lodash.isarguments'),
    isArray = require('lodash.isarray');

/** Used to detect unsigned integer values. */
var reIsUint = /^\d+$/;

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/* Native method references for those with the same name as other `lodash` methods. */
var nativeKeys = getNative(Object, 'keys');

/**
 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

/**
 * Gets the "length" property value of `object`.
 *
 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
 * that affects Safari on at least iOS 8.1-8.3 ARM64.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {*} Returns the "length" value.
 */
var getLength = baseProperty('length');

/**
 * Checks if `value` is array-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 */
function isArrayLike(value) {
  return value != null && isLength(getLength(value));
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
  length = length == null ? MAX_SAFE_INTEGER : length;
  return value > -1 && value % 1 == 0 && value < length;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * A fallback implementation of `Object.keys` which creates an array of the
 * own enumerable property names of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function shimKeys(object) {
  var props = keysIn(object),
      propsLength = props.length,
      length = propsLength && object.length;

  var allowIndexes = !!length && isLength(length) &&
    (isArray(object) || isArguments(object));

  var index = -1,
      result = [];

  while (++index < propsLength) {
    var key = props[index];
    if ((allowIndexes && isIndex(key, length)) || hasOwnProperty.call(object, key)) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
var keys = !nativeKeys ? shimKeys : function(object) {
  var Ctor = object == null ? undefined : object.constructor;
  if ((typeof Ctor == 'function' && Ctor.prototype === object) ||
      (typeof object != 'function' && isArrayLike(object))) {
    return shimKeys(object);
  }
  return isObject(object) ? nativeKeys(object) : [];
};

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  if (object == null) {
    return [];
  }
  if (!isObject(object)) {
    object = Object(object);
  }
  var length = object.length;
  length = (length && isLength(length) &&
    (isArray(object) || isArguments(object)) && length) || 0;

  var Ctor = object.constructor,
      index = -1,
      isProto = typeof Ctor == 'function' && Ctor.prototype === object,
      result = Array(length),
      skipIndexes = length > 0;

  while (++index < length) {
    result[index] = (index + '');
  }
  for (var key in object) {
    if (!(skipIndexes && isIndex(key, length)) &&
        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = keys;

},{"lodash._getnative":5,"lodash.isarguments":10,"lodash.isarray":11}],13:[function(require,module,exports){
/**
 * lodash 3.6.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Native method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * Creates a function that invokes `func` with the `this` binding of the
 * created function and arguments from `start` and beyond provided as an array.
 *
 * **Note:** This method is based on the [rest parameter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters).
 *
 * @static
 * @memberOf _
 * @category Function
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 * @example
 *
 * var say = _.restParam(function(what, names) {
 *   return what + ' ' + _.initial(names).join(', ') +
 *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
 * });
 *
 * say('hello', 'fred', 'barney', 'pebbles');
 * // => 'hello fred, barney, & pebbles'
 */
function restParam(func, start) {
  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  start = nativeMax(start === undefined ? (func.length - 1) : (+start || 0), 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        rest = Array(length);

    while (++index < length) {
      rest[index] = args[start + index];
    }
    switch (start) {
      case 0: return func.call(this, rest);
      case 1: return func.call(this, args[0], rest);
      case 2: return func.call(this, args[0], args[1], rest);
    }
    var otherArgs = Array(start + 1);
    index = -1;
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = rest;
    return func.apply(this, otherArgs);
  };
}

module.exports = restParam;

},{}],14:[function(require,module,exports){
/**
 * lodash 3.6.2 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var baseCopy = require('lodash._basecopy'),
    baseToString = require('lodash._basetostring'),
    baseValues = require('lodash._basevalues'),
    isIterateeCall = require('lodash._isiterateecall'),
    reInterpolate = require('lodash._reinterpolate'),
    keys = require('lodash.keys'),
    restParam = require('lodash.restparam'),
    templateSettings = require('lodash.templatesettings');

/** `Object#toString` result references. */
var errorTag = '[object Error]';

/** Used to match empty string literals in compiled template source. */
var reEmptyStringLeading = /\b__p \+= '';/g,
    reEmptyStringMiddle = /\b(__p \+=) '' \+/g,
    reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;

/** Used to match [ES template delimiters](http://ecma-international.org/ecma-262/6.0/#sec-template-literal-lexical-components). */
var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;

/** Used to ensure capturing order of template delimiters. */
var reNoMatch = /($^)/;

/** Used to match unescaped characters in compiled string literals. */
var reUnescapedString = /['\n\r\u2028\u2029\\]/g;

/** Used to escape characters for inclusion in compiled string literals. */
var stringEscapes = {
  '\\': '\\',
  "'": "'",
  '\n': 'n',
  '\r': 'r',
  '\u2028': 'u2028',
  '\u2029': 'u2029'
};

/**
 * Used by `_.template` to escape characters for inclusion in compiled string literals.
 *
 * @private
 * @param {string} chr The matched character to escape.
 * @returns {string} Returns the escaped character.
 */
function escapeStringChar(chr) {
  return '\\' + stringEscapes[chr];
}

/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/**
 * Used by `_.template` to customize its `_.assign` use.
 *
 * **Note:** This function is like `assignDefaults` except that it ignores
 * inherited property values when checking if a property is `undefined`.
 *
 * @private
 * @param {*} objectValue The destination object property value.
 * @param {*} sourceValue The source object property value.
 * @param {string} key The key associated with the object and source values.
 * @param {Object} object The destination object.
 * @returns {*} Returns the value to assign to the destination object.
 */
function assignOwnDefaults(objectValue, sourceValue, key, object) {
  return (objectValue === undefined || !hasOwnProperty.call(object, key))
    ? sourceValue
    : objectValue;
}

/**
 * A specialized version of `_.assign` for customizing assigned values without
 * support for argument juggling, multiple sources, and `this` binding `customizer`
 * functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {Function} customizer The function to customize assigned values.
 * @returns {Object} Returns `object`.
 */
function assignWith(object, source, customizer) {
  var index = -1,
      props = keys(source),
      length = props.length;

  while (++index < length) {
    var key = props[index],
        value = object[key],
        result = customizer(value, source[key], key, object, source);

    if ((result === result ? (result !== value) : (value === value)) ||
        (value === undefined && !(key in object))) {
      object[key] = result;
    }
  }
  return object;
}

/**
 * The base implementation of `_.assign` without support for argument juggling,
 * multiple sources, and `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssign(object, source) {
  return source == null
    ? object
    : baseCopy(source, keys(source), object);
}

/**
 * Checks if `value` is an `Error`, `EvalError`, `RangeError`, `ReferenceError`,
 * `SyntaxError`, `TypeError`, or `URIError` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an error object, else `false`.
 * @example
 *
 * _.isError(new Error);
 * // => true
 *
 * _.isError(Error);
 * // => false
 */
function isError(value) {
  return isObjectLike(value) && typeof value.message == 'string' && objToString.call(value) == errorTag;
}

/**
 * Creates a compiled template function that can interpolate data properties
 * in "interpolate" delimiters, HTML-escape interpolated data properties in
 * "escape" delimiters, and execute JavaScript in "evaluate" delimiters. Data
 * properties may be accessed as free variables in the template. If a setting
 * object is provided it takes precedence over `_.templateSettings` values.
 *
 * **Note:** In the development build `_.template` utilizes
 * [sourceURLs](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl)
 * for easier debugging.
 *
 * For more information on precompiling templates see
 * [lodash's custom builds documentation](https://lodash.com/custom-builds).
 *
 * For more information on Chrome extension sandboxes see
 * [Chrome's extensions documentation](https://developer.chrome.com/extensions/sandboxingEval).
 *
 * @static
 * @memberOf _
 * @category String
 * @param {string} [string=''] The template string.
 * @param {Object} [options] The options object.
 * @param {RegExp} [options.escape] The HTML "escape" delimiter.
 * @param {RegExp} [options.evaluate] The "evaluate" delimiter.
 * @param {Object} [options.imports] An object to import into the template as free variables.
 * @param {RegExp} [options.interpolate] The "interpolate" delimiter.
 * @param {string} [options.sourceURL] The sourceURL of the template's compiled source.
 * @param {string} [options.variable] The data object variable name.
 * @param- {Object} [otherOptions] Enables the legacy `options` param signature.
 * @returns {Function} Returns the compiled template function.
 * @example
 *
 * // using the "interpolate" delimiter to create a compiled template
 * var compiled = _.template('hello <%= user %>!');
 * compiled({ 'user': 'fred' });
 * // => 'hello fred!'
 *
 * // using the HTML "escape" delimiter to escape data property values
 * var compiled = _.template('<b><%- value %></b>');
 * compiled({ 'value': '<script>' });
 * // => '<b>&lt;script&gt;</b>'
 *
 * // using the "evaluate" delimiter to execute JavaScript and generate HTML
 * var compiled = _.template('<% _.forEach(users, function(user) { %><li><%- user %></li><% }); %>');
 * compiled({ 'users': ['fred', 'barney'] });
 * // => '<li>fred</li><li>barney</li>'
 *
 * // using the internal `print` function in "evaluate" delimiters
 * var compiled = _.template('<% print("hello " + user); %>!');
 * compiled({ 'user': 'barney' });
 * // => 'hello barney!'
 *
 * // using the ES delimiter as an alternative to the default "interpolate" delimiter
 * var compiled = _.template('hello ${ user }!');
 * compiled({ 'user': 'pebbles' });
 * // => 'hello pebbles!'
 *
 * // using custom template delimiters
 * _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
 * var compiled = _.template('hello {{ user }}!');
 * compiled({ 'user': 'mustache' });
 * // => 'hello mustache!'
 *
 * // using backslashes to treat delimiters as plain text
 * var compiled = _.template('<%= "\\<%- value %\\>" %>');
 * compiled({ 'value': 'ignored' });
 * // => '<%- value %>'
 *
 * // using the `imports` option to import `jQuery` as `jq`
 * var text = '<% jq.each(users, function(user) { %><li><%- user %></li><% }); %>';
 * var compiled = _.template(text, { 'imports': { 'jq': jQuery } });
 * compiled({ 'users': ['fred', 'barney'] });
 * // => '<li>fred</li><li>barney</li>'
 *
 * // using the `sourceURL` option to specify a custom sourceURL for the template
 * var compiled = _.template('hello <%= user %>!', { 'sourceURL': '/basic/greeting.jst' });
 * compiled(data);
 * // => find the source of "greeting.jst" under the Sources tab or Resources panel of the web inspector
 *
 * // using the `variable` option to ensure a with-statement isn't used in the compiled template
 * var compiled = _.template('hi <%= data.user %>!', { 'variable': 'data' });
 * compiled.source;
 * // => function(data) {
 * //   var __t, __p = '';
 * //   __p += 'hi ' + ((__t = ( data.user )) == null ? '' : __t) + '!';
 * //   return __p;
 * // }
 *
 * // using the `source` property to inline compiled templates for meaningful
 * // line numbers in error messages and a stack trace
 * fs.writeFileSync(path.join(cwd, 'jst.js'), '\
 *   var JST = {\
 *     "main": ' + _.template(mainText).source + '\
 *   };\
 * ');
 */
function template(string, options, otherOptions) {
  // Based on John Resig's `tmpl` implementation (http://ejohn.org/blog/javascript-micro-templating/)
  // and Laura Doktorova's doT.js (https://github.com/olado/doT).
  var settings = templateSettings.imports._.templateSettings || templateSettings;

  if (otherOptions && isIterateeCall(string, options, otherOptions)) {
    options = otherOptions = undefined;
  }
  string = baseToString(string);
  options = assignWith(baseAssign({}, otherOptions || options), settings, assignOwnDefaults);

  var imports = assignWith(baseAssign({}, options.imports), settings.imports, assignOwnDefaults),
      importsKeys = keys(imports),
      importsValues = baseValues(imports, importsKeys);

  var isEscaping,
      isEvaluating,
      index = 0,
      interpolate = options.interpolate || reNoMatch,
      source = "__p += '";

  // Compile the regexp to match each delimiter.
  var reDelimiters = RegExp(
    (options.escape || reNoMatch).source + '|' +
    interpolate.source + '|' +
    (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + '|' +
    (options.evaluate || reNoMatch).source + '|$'
  , 'g');

  // Use a sourceURL for easier debugging.
  var sourceURL = 'sourceURL' in options ? '//# sourceURL=' + options.sourceURL + '\n' : '';

  string.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
    interpolateValue || (interpolateValue = esTemplateValue);

    // Escape characters that can't be included in string literals.
    source += string.slice(index, offset).replace(reUnescapedString, escapeStringChar);

    // Replace delimiters with snippets.
    if (escapeValue) {
      isEscaping = true;
      source += "' +\n__e(" + escapeValue + ") +\n'";
    }
    if (evaluateValue) {
      isEvaluating = true;
      source += "';\n" + evaluateValue + ";\n__p += '";
    }
    if (interpolateValue) {
      source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
    }
    index = offset + match.length;

    // The JS engine embedded in Adobe products requires returning the `match`
    // string in order to produce the correct `offset` value.
    return match;
  });

  source += "';\n";

  // If `variable` is not specified wrap a with-statement around the generated
  // code to add the data object to the top of the scope chain.
  var variable = options.variable;
  if (!variable) {
    source = 'with (obj) {\n' + source + '\n}\n';
  }
  // Cleanup code by stripping empty strings.
  source = (isEvaluating ? source.replace(reEmptyStringLeading, '') : source)
    .replace(reEmptyStringMiddle, '$1')
    .replace(reEmptyStringTrailing, '$1;');

  // Frame code as the function body.
  source = 'function(' + (variable || 'obj') + ') {\n' +
    (variable
      ? ''
      : 'obj || (obj = {});\n'
    ) +
    "var __t, __p = ''" +
    (isEscaping
       ? ', __e = _.escape'
       : ''
    ) +
    (isEvaluating
      ? ', __j = Array.prototype.join;\n' +
        "function print() { __p += __j.call(arguments, '') }\n"
      : ';\n'
    ) +
    source +
    'return __p\n}';

  var result = attempt(function() {
    return Function(importsKeys, sourceURL + 'return ' + source).apply(undefined, importsValues);
  });

  // Provide the compiled function's source by its `toString` method or
  // the `source` property as a convenience for inlining compiled templates.
  result.source = source;
  if (isError(result)) {
    throw result;
  }
  return result;
}

/**
 * Attempts to invoke `func`, returning either the result or the caught error
 * object. Any additional arguments are provided to `func` when it is invoked.
 *
 * @static
 * @memberOf _
 * @category Utility
 * @param {Function} func The function to attempt.
 * @returns {*} Returns the `func` result or error object.
 * @example
 *
 * // avoid throwing errors for invalid selectors
 * var elements = _.attempt(function(selector) {
 *   return document.querySelectorAll(selector);
 * }, '>_>');
 *
 * if (_.isError(elements)) {
 *   elements = [];
 * }
 */
var attempt = restParam(function(func, args) {
  try {
    return func.apply(undefined, args);
  } catch(e) {
    return isError(e) ? e : new Error(e);
  }
});

module.exports = template;

},{"lodash._basecopy":2,"lodash._basetostring":3,"lodash._basevalues":4,"lodash._isiterateecall":6,"lodash._reinterpolate":7,"lodash.keys":12,"lodash.restparam":13,"lodash.templatesettings":15}],15:[function(require,module,exports){
/**
 * lodash 3.1.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var escape = require('lodash.escape'),
    reInterpolate = require('lodash._reinterpolate');

/** Used to match template delimiters. */
var reEscape = /<%-([\s\S]+?)%>/g,
    reEvaluate = /<%([\s\S]+?)%>/g;

/**
 * By default, the template delimiters used by lodash are like those in
 * embedded Ruby (ERB). Change the following template settings to use
 * alternative delimiters.
 *
 * @static
 * @memberOf _
 * @type Object
 */
var templateSettings = {

  /**
   * Used to detect `data` property values to be HTML-escaped.
   *
   * @memberOf _.templateSettings
   * @type RegExp
   */
  'escape': reEscape,

  /**
   * Used to detect code to be evaluated.
   *
   * @memberOf _.templateSettings
   * @type RegExp
   */
  'evaluate': reEvaluate,

  /**
   * Used to detect `data` property values to inject.
   *
   * @memberOf _.templateSettings
   * @type RegExp
   */
  'interpolate': reInterpolate,

  /**
   * Used to reference the data object in the template text.
   *
   * @memberOf _.templateSettings
   * @type string
   */
  'variable': '',

  /**
   * Used to import variables into the compiled template.
   *
   * @memberOf _.templateSettings
   * @type Object
   */
  'imports': {

    /**
     * A reference to the `lodash` function.
     *
     * @memberOf _.templateSettings.imports
     * @type Function
     */
    '_': { 'escape': escape }
  }
};

module.exports = templateSettings;

},{"lodash._reinterpolate":7,"lodash.escape":9}],16:[function(require,module,exports){
(function (process){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

}).call(this,require('_process'))
},{"_process":17}],17:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],18:[function(require,module,exports){
!function t(e,r){"object"==typeof exports&&"object"==typeof module?module.exports=r():"function"==typeof define&&define.amd?define([],r):"object"==typeof exports?exports.Raphael=r():e.Raphael=r()}(this,function(){return function(t){function e(i){if(r[i])return r[i].exports;var n=r[i]={exports:{},id:i,loaded:!1};return t[i].call(n.exports,n,n.exports,e),n.loaded=!0,n.exports}var r={};return e.m=t,e.c=r,e.p="",e(0)}([function(t,e,r){var i,n;i=[r(1),r(3),r(4)],n=function(t){return t}.apply(e,i),!(void 0!==n&&(t.exports=n))},function(t,e,r){var i,n;i=[r(2)],n=function(t){function e(r){if(e.is(r,"function"))return w?r():t.on("raphael.DOMload",r);if(e.is(r,Q))return e._engine.create[z](e,r.splice(0,3+e.is(r[0],$))).add(r);var i=Array.prototype.slice.call(arguments,0);if(e.is(i[i.length-1],"function")){var n=i.pop();return w?n.call(e._engine.create[z](e,i)):t.on("raphael.DOMload",function(){n.call(e._engine.create[z](e,i))})}return e._engine.create[z](e,arguments)}function r(t){if("function"==typeof t||Object(t)!==t)return t;var e=new t.constructor;for(var i in t)t[A](i)&&(e[i]=r(t[i]));return e}function i(t,e){for(var r=0,i=t.length;r<i;r++)if(t[r]===e)return t.push(t.splice(r,1)[0])}function n(t,e,r){function n(){var a=Array.prototype.slice.call(arguments,0),s=a.join("␀"),o=n.cache=n.cache||{},l=n.count=n.count||[];return o[A](s)?(i(l,s),r?r(o[s]):o[s]):(l.length>=1e3&&delete o[l.shift()],l.push(s),o[s]=t[z](e,a),r?r(o[s]):o[s])}return n}function a(){return this.hex}function s(t,e){for(var r=[],i=0,n=t.length;n-2*!e>i;i+=2){var a=[{x:+t[i-2],y:+t[i-1]},{x:+t[i],y:+t[i+1]},{x:+t[i+2],y:+t[i+3]},{x:+t[i+4],y:+t[i+5]}];e?i?n-4==i?a[3]={x:+t[0],y:+t[1]}:n-2==i&&(a[2]={x:+t[0],y:+t[1]},a[3]={x:+t[2],y:+t[3]}):a[0]={x:+t[n-2],y:+t[n-1]}:n-4==i?a[3]=a[2]:i||(a[0]={x:+t[i],y:+t[i+1]}),r.push(["C",(-a[0].x+6*a[1].x+a[2].x)/6,(-a[0].y+6*a[1].y+a[2].y)/6,(a[1].x+6*a[2].x-a[3].x)/6,(a[1].y+6*a[2].y-a[3].y)/6,a[2].x,a[2].y])}return r}function o(t,e,r,i,n){var a=-3*e+9*r-9*i+3*n,s=t*a+6*e-12*r+6*i;return t*s-3*e+3*r}function l(t,e,r,i,n,a,s,l,h){null==h&&(h=1),h=h>1?1:h<0?0:h;for(var u=h/2,c=12,f=[-.1252,.1252,-.3678,.3678,-.5873,.5873,-.7699,.7699,-.9041,.9041,-.9816,.9816],p=[.2491,.2491,.2335,.2335,.2032,.2032,.1601,.1601,.1069,.1069,.0472,.0472],d=0,g=0;g<c;g++){var v=u*f[g]+u,x=o(v,t,r,n,s),y=o(v,e,i,a,l),m=x*x+y*y;d+=p[g]*Y.sqrt(m)}return u*d}function h(t,e,r,i,n,a,s,o,h){if(!(h<0||l(t,e,r,i,n,a,s,o)<h)){var u=1,c=u/2,f=u-c,p,d=.01;for(p=l(t,e,r,i,n,a,s,o,f);H(p-h)>d;)c/=2,f+=(p<h?1:-1)*c,p=l(t,e,r,i,n,a,s,o,f);return f}}function u(t,e,r,i,n,a,s,o){if(!(W(t,r)<G(n,s)||G(t,r)>W(n,s)||W(e,i)<G(a,o)||G(e,i)>W(a,o))){var l=(t*i-e*r)*(n-s)-(t-r)*(n*o-a*s),h=(t*i-e*r)*(a-o)-(e-i)*(n*o-a*s),u=(t-r)*(a-o)-(e-i)*(n-s);if(u){var c=l/u,f=h/u,p=+c.toFixed(2),d=+f.toFixed(2);if(!(p<+G(t,r).toFixed(2)||p>+W(t,r).toFixed(2)||p<+G(n,s).toFixed(2)||p>+W(n,s).toFixed(2)||d<+G(e,i).toFixed(2)||d>+W(e,i).toFixed(2)||d<+G(a,o).toFixed(2)||d>+W(a,o).toFixed(2)))return{x:c,y:f}}}}function c(t,e){return p(t,e)}function f(t,e){return p(t,e,1)}function p(t,r,i){var n=e.bezierBBox(t),a=e.bezierBBox(r);if(!e.isBBoxIntersect(n,a))return i?0:[];for(var s=l.apply(0,t),o=l.apply(0,r),h=W(~~(s/5),1),c=W(~~(o/5),1),f=[],p=[],d={},g=i?0:[],v=0;v<h+1;v++){var x=e.findDotsAtSegment.apply(e,t.concat(v/h));f.push({x:x.x,y:x.y,t:v/h})}for(v=0;v<c+1;v++)x=e.findDotsAtSegment.apply(e,r.concat(v/c)),p.push({x:x.x,y:x.y,t:v/c});for(v=0;v<h;v++)for(var y=0;y<c;y++){var m=f[v],b=f[v+1],_=p[y],w=p[y+1],k=H(b.x-m.x)<.001?"y":"x",B=H(w.x-_.x)<.001?"y":"x",C=u(m.x,m.y,b.x,b.y,_.x,_.y,w.x,w.y);if(C){if(d[C.x.toFixed(4)]==C.y.toFixed(4))continue;d[C.x.toFixed(4)]=C.y.toFixed(4);var S=m.t+H((C[k]-m[k])/(b[k]-m[k]))*(b.t-m.t),A=_.t+H((C[B]-_[B])/(w[B]-_[B]))*(w.t-_.t);S>=0&&S<=1.001&&A>=0&&A<=1.001&&(i?g++:g.push({x:C.x,y:C.y,t1:G(S,1),t2:G(A,1)}))}}return g}function d(t,r,i){t=e._path2curve(t),r=e._path2curve(r);for(var n,a,s,o,l,h,u,c,f,d,g=i?0:[],v=0,x=t.length;v<x;v++){var y=t[v];if("M"==y[0])n=l=y[1],a=h=y[2];else{"C"==y[0]?(f=[n,a].concat(y.slice(1)),n=f[6],a=f[7]):(f=[n,a,n,a,l,h,l,h],n=l,a=h);for(var m=0,b=r.length;m<b;m++){var _=r[m];if("M"==_[0])s=u=_[1],o=c=_[2];else{"C"==_[0]?(d=[s,o].concat(_.slice(1)),s=d[6],o=d[7]):(d=[s,o,s,o,u,c,u,c],s=u,o=c);var w=p(f,d,i);if(i)g+=w;else{for(var k=0,B=w.length;k<B;k++)w[k].segment1=v,w[k].segment2=m,w[k].bez1=f,w[k].bez2=d;g=g.concat(w)}}}}}return g}function g(t,e,r,i,n,a){null!=t?(this.a=+t,this.b=+e,this.c=+r,this.d=+i,this.e=+n,this.f=+a):(this.a=1,this.b=0,this.c=0,this.d=1,this.e=0,this.f=0)}function v(){return this.x+j+this.y}function x(){return this.x+j+this.y+j+this.width+" × "+this.height}function y(t,e,r,i,n,a){function s(t){return((c*t+u)*t+h)*t}function o(t,e){var r=l(t,e);return((d*r+p)*r+f)*r}function l(t,e){var r,i,n,a,o,l;for(n=t,l=0;l<8;l++){if(a=s(n)-t,H(a)<e)return n;if(o=(3*c*n+2*u)*n+h,H(o)<1e-6)break;n-=a/o}if(r=0,i=1,n=t,n<r)return r;if(n>i)return i;for(;r<i;){if(a=s(n),H(a-t)<e)return n;t>a?r=n:i=n,n=(i-r)/2+r}return n}var h=3*e,u=3*(i-e)-h,c=1-h-u,f=3*r,p=3*(n-r)-f,d=1-f-p;return o(t,1/(200*a))}function m(t,e){var r=[],i={};if(this.ms=e,this.times=1,t){for(var n in t)t[A](n)&&(i[ht(n)]=t[n],r.push(ht(n)));r.sort(Bt)}this.anim=i,this.top=r[r.length-1],this.percents=r}function b(r,i,n,a,s,o){n=ht(n);var l,h,u,c=[],f,p,d,v=r.ms,x={},m={},b={};if(a)for(w=0,B=Ee.length;w<B;w++){var _=Ee[w];if(_.el.id==i.id&&_.anim==r){_.percent!=n?(Ee.splice(w,1),u=1):h=_,i.attr(_.totalOrigin);break}}else a=+m;for(var w=0,B=r.percents.length;w<B;w++){if(r.percents[w]==n||r.percents[w]>a*r.top){n=r.percents[w],p=r.percents[w-1]||0,v=v/r.top*(n-p),f=r.percents[w+1],l=r.anim[n];break}a&&i.attr(r.anim[r.percents[w]])}if(l){if(h)h.initstatus=a,h.start=new Date-h.ms*a;else{for(var C in l)if(l[A](C)&&(pt[A](C)||i.paper.customAttributes[A](C)))switch(x[C]=i.attr(C),null==x[C]&&(x[C]=ft[C]),m[C]=l[C],pt[C]){case $:b[C]=(m[C]-x[C])/v;break;case"colour":x[C]=e.getRGB(x[C]);var S=e.getRGB(m[C]);b[C]={r:(S.r-x[C].r)/v,g:(S.g-x[C].g)/v,b:(S.b-x[C].b)/v};break;case"path":var T=Qt(x[C],m[C]),E=T[1];for(x[C]=T[0],b[C]=[],w=0,B=x[C].length;w<B;w++){b[C][w]=[0];for(var M=1,N=x[C][w].length;M<N;M++)b[C][w][M]=(E[w][M]-x[C][w][M])/v}break;case"transform":var L=i._,z=le(L[C],m[C]);if(z)for(x[C]=z.from,m[C]=z.to,b[C]=[],b[C].real=!0,w=0,B=x[C].length;w<B;w++)for(b[C][w]=[x[C][w][0]],M=1,N=x[C][w].length;M<N;M++)b[C][w][M]=(m[C][w][M]-x[C][w][M])/v;else{var F=i.matrix||new g,R={_:{transform:L.transform},getBBox:function(){return i.getBBox(1)}};x[C]=[F.a,F.b,F.c,F.d,F.e,F.f],se(R,m[C]),m[C]=R._.transform,b[C]=[(R.matrix.a-F.a)/v,(R.matrix.b-F.b)/v,(R.matrix.c-F.c)/v,(R.matrix.d-F.d)/v,(R.matrix.e-F.e)/v,(R.matrix.f-F.f)/v]}break;case"csv":var j=I(l[C])[q](k),D=I(x[C])[q](k);if("clip-rect"==C)for(x[C]=D,b[C]=[],w=D.length;w--;)b[C][w]=(j[w]-x[C][w])/v;m[C]=j;break;default:for(j=[][P](l[C]),D=[][P](x[C]),b[C]=[],w=i.paper.customAttributes[C].length;w--;)b[C][w]=((j[w]||0)-(D[w]||0))/v}var V=l.easing,O=e.easing_formulas[V];if(!O)if(O=I(V).match(st),O&&5==O.length){var Y=O;O=function(t){return y(t,+Y[1],+Y[2],+Y[3],+Y[4],v)}}else O=St;if(d=l.start||r.start||+new Date,_={anim:r,percent:n,timestamp:d,start:d+(r.del||0),status:0,initstatus:a||0,stop:!1,ms:v,easing:O,from:x,diff:b,to:m,el:i,callback:l.callback,prev:p,next:f,repeat:o||r.times,origin:i.attr(),totalOrigin:s},Ee.push(_),a&&!h&&!u&&(_.stop=!0,_.start=new Date-v*a,1==Ee.length))return Ne();u&&(_.start=new Date-_.ms*a),1==Ee.length&&Me(Ne)}t("raphael.anim.start."+i.id,i,r)}}function _(t){for(var e=0;e<Ee.length;e++)Ee[e].el.paper==t&&Ee.splice(e--,1)}e.version="2.2.0",e.eve=t;var w,k=/[, ]+/,B={circle:1,rect:1,path:1,ellipse:1,text:1,image:1},C=/\{(\d+)\}/g,S="prototype",A="hasOwnProperty",T={doc:document,win:window},E={was:Object.prototype[A].call(T.win,"Raphael"),is:T.win.Raphael},M=function(){this.ca=this.customAttributes={}},N,L="appendChild",z="apply",P="concat",F="ontouchstart"in T.win||T.win.DocumentTouch&&T.doc instanceof DocumentTouch,R="",j=" ",I=String,q="split",D="click dblclick mousedown mousemove mouseout mouseover mouseup touchstart touchmove touchend touchcancel"[q](j),V={mousedown:"touchstart",mousemove:"touchmove",mouseup:"touchend"},O=I.prototype.toLowerCase,Y=Math,W=Y.max,G=Y.min,H=Y.abs,X=Y.pow,U=Y.PI,$="number",Z="string",Q="array",J="toString",K="fill",tt=Object.prototype.toString,et={},rt="push",it=e._ISURL=/^url\(['"]?(.+?)['"]?\)$/i,nt=/^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\))\s*$/i,at={NaN:1,Infinity:1,"-Infinity":1},st=/^(?:cubic-)?bezier\(([^,]+),([^,]+),([^,]+),([^\)]+)\)/,ot=Y.round,lt="setAttribute",ht=parseFloat,ut=parseInt,ct=I.prototype.toUpperCase,ft=e._availableAttrs={"arrow-end":"none","arrow-start":"none",blur:0,"clip-rect":"0 0 1e9 1e9",cursor:"default",cx:0,cy:0,fill:"#fff","fill-opacity":1,font:'10px "Arial"',"font-family":'"Arial"',"font-size":"10","font-style":"normal","font-weight":400,gradient:0,height:0,href:"http://raphaeljs.com/","letter-spacing":0,opacity:1,path:"M0,0",r:0,rx:0,ry:0,src:"",stroke:"#000","stroke-dasharray":"","stroke-linecap":"butt","stroke-linejoin":"butt","stroke-miterlimit":0,"stroke-opacity":1,"stroke-width":1,target:"_blank","text-anchor":"middle",title:"Raphael",transform:"",width:0,x:0,y:0,"class":""},pt=e._availableAnimAttrs={blur:$,"clip-rect":"csv",cx:$,cy:$,fill:"colour","fill-opacity":$,"font-size":$,height:$,opacity:$,path:"path",r:$,rx:$,ry:$,stroke:"colour","stroke-opacity":$,"stroke-width":$,transform:"transform",width:$,x:$,y:$},dt=/[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]/g,gt=/[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/,vt={hs:1,rg:1},xt=/,?([achlmqrstvxz]),?/gi,yt=/([achlmrqstvz])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/gi,mt=/([rstm])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/gi,bt=/(-?\d*\.?\d*(?:e[\-+]?\d+)?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/gi,_t=e._radial_gradient=/^r(?:\(([^,]+?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*([^\)]+?)\))?/,wt={},kt=function(t,e){return t.key-e.key},Bt=function(t,e){return ht(t)-ht(e)},Ct=function(){},St=function(t){return t},At=e._rectPath=function(t,e,r,i,n){return n?[["M",t+n,e],["l",r-2*n,0],["a",n,n,0,0,1,n,n],["l",0,i-2*n],["a",n,n,0,0,1,-n,n],["l",2*n-r,0],["a",n,n,0,0,1,-n,-n],["l",0,2*n-i],["a",n,n,0,0,1,n,-n],["z"]]:[["M",t,e],["l",r,0],["l",0,i],["l",-r,0],["z"]]},Tt=function(t,e,r,i){return null==i&&(i=r),[["M",t,e],["m",0,-i],["a",r,i,0,1,1,0,2*i],["a",r,i,0,1,1,0,-2*i],["z"]]},Et=e._getPath={path:function(t){return t.attr("path")},circle:function(t){var e=t.attrs;return Tt(e.cx,e.cy,e.r)},ellipse:function(t){var e=t.attrs;return Tt(e.cx,e.cy,e.rx,e.ry)},rect:function(t){var e=t.attrs;return At(e.x,e.y,e.width,e.height,e.r)},image:function(t){var e=t.attrs;return At(e.x,e.y,e.width,e.height)},text:function(t){var e=t._getBBox();return At(e.x,e.y,e.width,e.height)},set:function(t){var e=t._getBBox();return At(e.x,e.y,e.width,e.height)}},Mt=e.mapPath=function(t,e){if(!e)return t;var r,i,n,a,s,o,l;for(t=Qt(t),n=0,s=t.length;n<s;n++)for(l=t[n],a=1,o=l.length;a<o;a+=2)r=e.x(l[a],l[a+1]),i=e.y(l[a],l[a+1]),l[a]=r,l[a+1]=i;return t};if(e._g=T,e.type=T.win.SVGAngle||T.doc.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure","1.1")?"SVG":"VML","VML"==e.type){var Nt=T.doc.createElement("div"),Lt;if(Nt.innerHTML='<v:shape adj="1"/>',Lt=Nt.firstChild,Lt.style.behavior="url(#default#VML)",!Lt||"object"!=typeof Lt.adj)return e.type=R;Nt=null}e.svg=!(e.vml="VML"==e.type),e._Paper=M,e.fn=N=M.prototype=e.prototype,e._id=0,e.is=function(t,e){return e=O.call(e),"finite"==e?!at[A](+t):"array"==e?t instanceof Array:"null"==e&&null===t||e==typeof t&&null!==t||"object"==e&&t===Object(t)||"array"==e&&Array.isArray&&Array.isArray(t)||tt.call(t).slice(8,-1).toLowerCase()==e},e.angle=function(t,r,i,n,a,s){if(null==a){var o=t-i,l=r-n;return o||l?(180+180*Y.atan2(-l,-o)/U+360)%360:0}return e.angle(t,r,a,s)-e.angle(i,n,a,s)},e.rad=function(t){return t%360*U/180},e.deg=function(t){return Math.round(180*t/U%360*1e3)/1e3},e.snapTo=function(t,r,i){if(i=e.is(i,"finite")?i:10,e.is(t,Q)){for(var n=t.length;n--;)if(H(t[n]-r)<=i)return t[n]}else{t=+t;var a=r%t;if(a<i)return r-a;if(a>t-i)return r-a+t}return r};var zt=e.createUUID=function(t,e){return function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(t,e).toUpperCase()}}(/[xy]/g,function(t){var e=16*Y.random()|0,r="x"==t?e:3&e|8;return r.toString(16)});e.setWindow=function(r){t("raphael.setWindow",e,T.win,r),T.win=r,T.doc=T.win.document,e._engine.initWin&&e._engine.initWin(T.win)};var Pt=function(t){if(e.vml){var r=/^\s+|\s+$/g,i;try{var a=new ActiveXObject("htmlfile");a.write("<body>"),a.close(),i=a.body}catch(s){i=createPopup().document.body}var o=i.createTextRange();Pt=n(function(t){try{i.style.color=I(t).replace(r,R);var e=o.queryCommandValue("ForeColor");return e=(255&e)<<16|65280&e|(16711680&e)>>>16,"#"+("000000"+e.toString(16)).slice(-6)}catch(n){return"none"}})}else{var l=T.doc.createElement("i");l.title="Raphaël Colour Picker",l.style.display="none",T.doc.body.appendChild(l),Pt=n(function(t){return l.style.color=t,T.doc.defaultView.getComputedStyle(l,R).getPropertyValue("color")})}return Pt(t)},Ft=function(){return"hsb("+[this.h,this.s,this.b]+")"},Rt=function(){return"hsl("+[this.h,this.s,this.l]+")"},jt=function(){return this.hex},It=function(t,r,i){if(null==r&&e.is(t,"object")&&"r"in t&&"g"in t&&"b"in t&&(i=t.b,r=t.g,t=t.r),null==r&&e.is(t,Z)){var n=e.getRGB(t);t=n.r,r=n.g,i=n.b}return(t>1||r>1||i>1)&&(t/=255,r/=255,i/=255),[t,r,i]},qt=function(t,r,i,n){t*=255,r*=255,i*=255;var a={r:t,g:r,b:i,hex:e.rgb(t,r,i),toString:jt};return e.is(n,"finite")&&(a.opacity=n),a};e.color=function(t){var r;return e.is(t,"object")&&"h"in t&&"s"in t&&"b"in t?(r=e.hsb2rgb(t),t.r=r.r,t.g=r.g,t.b=r.b,t.hex=r.hex):e.is(t,"object")&&"h"in t&&"s"in t&&"l"in t?(r=e.hsl2rgb(t),t.r=r.r,t.g=r.g,t.b=r.b,t.hex=r.hex):(e.is(t,"string")&&(t=e.getRGB(t)),e.is(t,"object")&&"r"in t&&"g"in t&&"b"in t?(r=e.rgb2hsl(t),t.h=r.h,t.s=r.s,t.l=r.l,r=e.rgb2hsb(t),t.v=r.b):(t={hex:"none"},t.r=t.g=t.b=t.h=t.s=t.v=t.l=-1)),t.toString=jt,t},e.hsb2rgb=function(t,e,r,i){this.is(t,"object")&&"h"in t&&"s"in t&&"b"in t&&(r=t.b,e=t.s,i=t.o,t=t.h),t*=360;var n,a,s,o,l;return t=t%360/60,l=r*e,o=l*(1-H(t%2-1)),n=a=s=r-l,t=~~t,n+=[l,o,0,0,o,l][t],a+=[o,l,l,o,0,0][t],s+=[0,0,o,l,l,o][t],qt(n,a,s,i)},e.hsl2rgb=function(t,e,r,i){this.is(t,"object")&&"h"in t&&"s"in t&&"l"in t&&(r=t.l,e=t.s,t=t.h),(t>1||e>1||r>1)&&(t/=360,e/=100,r/=100),t*=360;var n,a,s,o,l;return t=t%360/60,l=2*e*(r<.5?r:1-r),o=l*(1-H(t%2-1)),n=a=s=r-l/2,t=~~t,n+=[l,o,0,0,o,l][t],a+=[o,l,l,o,0,0][t],s+=[0,0,o,l,l,o][t],qt(n,a,s,i)},e.rgb2hsb=function(t,e,r){r=It(t,e,r),t=r[0],e=r[1],r=r[2];var i,n,a,s;return a=W(t,e,r),s=a-G(t,e,r),i=0==s?null:a==t?(e-r)/s:a==e?(r-t)/s+2:(t-e)/s+4,i=(i+360)%6*60/360,n=0==s?0:s/a,{h:i,s:n,b:a,toString:Ft}},e.rgb2hsl=function(t,e,r){r=It(t,e,r),t=r[0],e=r[1],r=r[2];var i,n,a,s,o,l;return s=W(t,e,r),o=G(t,e,r),l=s-o,i=0==l?null:s==t?(e-r)/l:s==e?(r-t)/l+2:(t-e)/l+4,i=(i+360)%6*60/360,a=(s+o)/2,n=0==l?0:a<.5?l/(2*a):l/(2-2*a),{h:i,s:n,l:a,toString:Rt}},e._path2string=function(){return this.join(",").replace(xt,"$1")};var Dt=e._preload=function(t,e){var r=T.doc.createElement("img");r.style.cssText="position:absolute;left:-9999em;top:-9999em",r.onload=function(){e.call(this),this.onload=null,T.doc.body.removeChild(this)},r.onerror=function(){T.doc.body.removeChild(this)},T.doc.body.appendChild(r),r.src=t};e.getRGB=n(function(t){if(!t||(t=I(t)).indexOf("-")+1)return{r:-1,g:-1,b:-1,hex:"none",error:1,toString:a};if("none"==t)return{r:-1,g:-1,b:-1,hex:"none",toString:a};!(vt[A](t.toLowerCase().substring(0,2))||"#"==t.charAt())&&(t=Pt(t));var r,i,n,s,o,l,h,u=t.match(nt);return u?(u[2]&&(s=ut(u[2].substring(5),16),n=ut(u[2].substring(3,5),16),i=ut(u[2].substring(1,3),16)),u[3]&&(s=ut((l=u[3].charAt(3))+l,16),n=ut((l=u[3].charAt(2))+l,16),i=ut((l=u[3].charAt(1))+l,16)),u[4]&&(h=u[4][q](gt),i=ht(h[0]),"%"==h[0].slice(-1)&&(i*=2.55),n=ht(h[1]),"%"==h[1].slice(-1)&&(n*=2.55),s=ht(h[2]),"%"==h[2].slice(-1)&&(s*=2.55),"rgba"==u[1].toLowerCase().slice(0,4)&&(o=ht(h[3])),h[3]&&"%"==h[3].slice(-1)&&(o/=100)),u[5]?(h=u[5][q](gt),i=ht(h[0]),"%"==h[0].slice(-1)&&(i*=2.55),n=ht(h[1]),"%"==h[1].slice(-1)&&(n*=2.55),s=ht(h[2]),"%"==h[2].slice(-1)&&(s*=2.55),("deg"==h[0].slice(-3)||"°"==h[0].slice(-1))&&(i/=360),"hsba"==u[1].toLowerCase().slice(0,4)&&(o=ht(h[3])),h[3]&&"%"==h[3].slice(-1)&&(o/=100),e.hsb2rgb(i,n,s,o)):u[6]?(h=u[6][q](gt),i=ht(h[0]),"%"==h[0].slice(-1)&&(i*=2.55),n=ht(h[1]),"%"==h[1].slice(-1)&&(n*=2.55),s=ht(h[2]),"%"==h[2].slice(-1)&&(s*=2.55),("deg"==h[0].slice(-3)||"°"==h[0].slice(-1))&&(i/=360),"hsla"==u[1].toLowerCase().slice(0,4)&&(o=ht(h[3])),h[3]&&"%"==h[3].slice(-1)&&(o/=100),e.hsl2rgb(i,n,s,o)):(u={r:i,g:n,b:s,toString:a},u.hex="#"+(16777216|s|n<<8|i<<16).toString(16).slice(1),e.is(o,"finite")&&(u.opacity=o),u)):{r:-1,g:-1,b:-1,hex:"none",error:1,toString:a}},e),e.hsb=n(function(t,r,i){return e.hsb2rgb(t,r,i).hex}),e.hsl=n(function(t,r,i){return e.hsl2rgb(t,r,i).hex}),e.rgb=n(function(t,e,r){function i(t){return t+.5|0}return"#"+(16777216|i(r)|i(e)<<8|i(t)<<16).toString(16).slice(1)}),e.getColor=function(t){var e=this.getColor.start=this.getColor.start||{h:0,s:1,b:t||.75},r=this.hsb2rgb(e.h,e.s,e.b);return e.h+=.075,e.h>1&&(e.h=0,e.s-=.2,e.s<=0&&(this.getColor.start={h:0,s:1,b:e.b})),r.hex},e.getColor.reset=function(){delete this.start},e.parsePathString=function(t){if(!t)return null;var r=Vt(t);if(r.arr)return Yt(r.arr);var i={a:7,c:6,h:1,l:2,m:2,r:4,q:4,s:4,t:2,v:1,z:0},n=[];return e.is(t,Q)&&e.is(t[0],Q)&&(n=Yt(t)),n.length||I(t).replace(yt,function(t,e,r){var a=[],s=e.toLowerCase();if(r.replace(bt,function(t,e){e&&a.push(+e)}),"m"==s&&a.length>2&&(n.push([e][P](a.splice(0,2))),s="l",e="m"==e?"l":"L"),"r"==s)n.push([e][P](a));else for(;a.length>=i[s]&&(n.push([e][P](a.splice(0,i[s]))),i[s]););}),n.toString=e._path2string,r.arr=Yt(n),n},e.parseTransformString=n(function(t){if(!t)return null;var r={r:3,s:4,t:2,m:6},i=[];return e.is(t,Q)&&e.is(t[0],Q)&&(i=Yt(t)),i.length||I(t).replace(mt,function(t,e,r){var n=[],a=O.call(e);r.replace(bt,function(t,e){e&&n.push(+e)}),i.push([e][P](n))}),i.toString=e._path2string,i});var Vt=function(t){var e=Vt.ps=Vt.ps||{};return e[t]?e[t].sleep=100:e[t]={sleep:100},setTimeout(function(){for(var r in e)e[A](r)&&r!=t&&(e[r].sleep--,!e[r].sleep&&delete e[r])}),e[t]};e.findDotsAtSegment=function(t,e,r,i,n,a,s,o,l){var h=1-l,u=X(h,3),c=X(h,2),f=l*l,p=f*l,d=u*t+3*c*l*r+3*h*l*l*n+p*s,g=u*e+3*c*l*i+3*h*l*l*a+p*o,v=t+2*l*(r-t)+f*(n-2*r+t),x=e+2*l*(i-e)+f*(a-2*i+e),y=r+2*l*(n-r)+f*(s-2*n+r),m=i+2*l*(a-i)+f*(o-2*a+i),b=h*t+l*r,_=h*e+l*i,w=h*n+l*s,k=h*a+l*o,B=90-180*Y.atan2(v-y,x-m)/U;return(v>y||x<m)&&(B+=180),{x:d,y:g,m:{x:v,y:x},n:{x:y,y:m},start:{x:b,y:_},end:{x:w,y:k},alpha:B}},e.bezierBBox=function(t,r,i,n,a,s,o,l){e.is(t,"array")||(t=[t,r,i,n,a,s,o,l]);var h=Zt.apply(null,t);return{x:h.min.x,y:h.min.y,x2:h.max.x,y2:h.max.y,width:h.max.x-h.min.x,height:h.max.y-h.min.y}},e.isPointInsideBBox=function(t,e,r){return e>=t.x&&e<=t.x2&&r>=t.y&&r<=t.y2},e.isBBoxIntersect=function(t,r){var i=e.isPointInsideBBox;return i(r,t.x,t.y)||i(r,t.x2,t.y)||i(r,t.x,t.y2)||i(r,t.x2,t.y2)||i(t,r.x,r.y)||i(t,r.x2,r.y)||i(t,r.x,r.y2)||i(t,r.x2,r.y2)||(t.x<r.x2&&t.x>r.x||r.x<t.x2&&r.x>t.x)&&(t.y<r.y2&&t.y>r.y||r.y<t.y2&&r.y>t.y)},e.pathIntersection=function(t,e){return d(t,e)},e.pathIntersectionNumber=function(t,e){return d(t,e,1)},e.isPointInsidePath=function(t,r,i){var n=e.pathBBox(t);return e.isPointInsideBBox(n,r,i)&&d(t,[["M",r,i],["H",n.x2+10]],1)%2==1},e._removedFactory=function(e){return function(){t("raphael.log",null,"Raphaël: you are calling to method “"+e+"” of removed object",e)}};var Ot=e.pathBBox=function(t){var e=Vt(t);if(e.bbox)return r(e.bbox);if(!t)return{x:0,y:0,width:0,height:0,x2:0,y2:0};t=Qt(t);for(var i=0,n=0,a=[],s=[],o,l=0,h=t.length;l<h;l++)if(o=t[l],"M"==o[0])i=o[1],n=o[2],a.push(i),s.push(n);else{var u=Zt(i,n,o[1],o[2],o[3],o[4],o[5],o[6]);a=a[P](u.min.x,u.max.x),s=s[P](u.min.y,u.max.y),i=o[5],n=o[6]}var c=G[z](0,a),f=G[z](0,s),p=W[z](0,a),d=W[z](0,s),g=p-c,v=d-f,x={x:c,y:f,x2:p,y2:d,width:g,height:v,cx:c+g/2,cy:f+v/2};return e.bbox=r(x),x},Yt=function(t){var i=r(t);return i.toString=e._path2string,i},Wt=e._pathToRelative=function(t){var r=Vt(t);if(r.rel)return Yt(r.rel);e.is(t,Q)&&e.is(t&&t[0],Q)||(t=e.parsePathString(t));var i=[],n=0,a=0,s=0,o=0,l=0;"M"==t[0][0]&&(n=t[0][1],a=t[0][2],s=n,o=a,l++,i.push(["M",n,a]));for(var h=l,u=t.length;h<u;h++){var c=i[h]=[],f=t[h];if(f[0]!=O.call(f[0]))switch(c[0]=O.call(f[0]),c[0]){case"a":c[1]=f[1],c[2]=f[2],c[3]=f[3],c[4]=f[4],c[5]=f[5],c[6]=+(f[6]-n).toFixed(3),c[7]=+(f[7]-a).toFixed(3);break;case"v":c[1]=+(f[1]-a).toFixed(3);break;case"m":s=f[1],o=f[2];default:for(var p=1,d=f.length;p<d;p++)c[p]=+(f[p]-(p%2?n:a)).toFixed(3)}else{c=i[h]=[],"m"==f[0]&&(s=f[1]+n,o=f[2]+a);for(var g=0,v=f.length;g<v;g++)i[h][g]=f[g]}var x=i[h].length;switch(i[h][0]){case"z":n=s,a=o;break;case"h":n+=+i[h][x-1];break;case"v":a+=+i[h][x-1];break;default:n+=+i[h][x-2],a+=+i[h][x-1]}}return i.toString=e._path2string,r.rel=Yt(i),i},Gt=e._pathToAbsolute=function(t){var r=Vt(t);if(r.abs)return Yt(r.abs);if(e.is(t,Q)&&e.is(t&&t[0],Q)||(t=e.parsePathString(t)),!t||!t.length)return[["M",0,0]];var i=[],n=0,a=0,o=0,l=0,h=0;"M"==t[0][0]&&(n=+t[0][1],a=+t[0][2],o=n,l=a,h++,i[0]=["M",n,a]);for(var u=3==t.length&&"M"==t[0][0]&&"R"==t[1][0].toUpperCase()&&"Z"==t[2][0].toUpperCase(),c,f,p=h,d=t.length;p<d;p++){if(i.push(c=[]),f=t[p],f[0]!=ct.call(f[0]))switch(c[0]=ct.call(f[0]),c[0]){case"A":c[1]=f[1],c[2]=f[2],c[3]=f[3],c[4]=f[4],c[5]=f[5],c[6]=+(f[6]+n),c[7]=+(f[7]+a);break;case"V":c[1]=+f[1]+a;break;case"H":c[1]=+f[1]+n;break;case"R":for(var g=[n,a][P](f.slice(1)),v=2,x=g.length;v<x;v++)g[v]=+g[v]+n,g[++v]=+g[v]+a;i.pop(),i=i[P](s(g,u));break;case"M":o=+f[1]+n,l=+f[2]+a;default:for(v=1,x=f.length;v<x;v++)c[v]=+f[v]+(v%2?n:a)}else if("R"==f[0])g=[n,a][P](f.slice(1)),i.pop(),i=i[P](s(g,u)),c=["R"][P](f.slice(-2));else for(var y=0,m=f.length;y<m;y++)c[y]=f[y];switch(c[0]){case"Z":n=o,a=l;break;case"H":n=c[1];break;case"V":a=c[1];break;case"M":o=c[c.length-2],l=c[c.length-1];default:n=c[c.length-2],a=c[c.length-1]}}return i.toString=e._path2string,r.abs=Yt(i),i},Ht=function(t,e,r,i){return[t,e,r,i,r,i]},Xt=function(t,e,r,i,n,a){var s=1/3,o=2/3;return[s*t+o*r,s*e+o*i,s*n+o*r,s*a+o*i,n,a]},Ut=function(t,e,r,i,a,s,o,l,h,u){var c=120*U/180,f=U/180*(+a||0),p=[],d,g=n(function(t,e,r){var i=t*Y.cos(r)-e*Y.sin(r),n=t*Y.sin(r)+e*Y.cos(r);return{x:i,y:n}});if(u)S=u[0],A=u[1],B=u[2],C=u[3];else{d=g(t,e,-f),t=d.x,e=d.y,d=g(l,h,-f),l=d.x,h=d.y;var v=Y.cos(U/180*a),x=Y.sin(U/180*a),y=(t-l)/2,m=(e-h)/2,b=y*y/(r*r)+m*m/(i*i);b>1&&(b=Y.sqrt(b),r=b*r,i=b*i);var _=r*r,w=i*i,k=(s==o?-1:1)*Y.sqrt(H((_*w-_*m*m-w*y*y)/(_*m*m+w*y*y))),B=k*r*m/i+(t+l)/2,C=k*-i*y/r+(e+h)/2,S=Y.asin(((e-C)/i).toFixed(9)),A=Y.asin(((h-C)/i).toFixed(9));S=t<B?U-S:S,A=l<B?U-A:A,S<0&&(S=2*U+S),A<0&&(A=2*U+A),o&&S>A&&(S-=2*U),!o&&A>S&&(A-=2*U)}var T=A-S;if(H(T)>c){var E=A,M=l,N=h;A=S+c*(o&&A>S?1:-1),l=B+r*Y.cos(A),h=C+i*Y.sin(A),p=Ut(l,h,r,i,a,0,o,M,N,[A,E,B,C])}T=A-S;var L=Y.cos(S),z=Y.sin(S),F=Y.cos(A),R=Y.sin(A),j=Y.tan(T/4),I=4/3*r*j,D=4/3*i*j,V=[t,e],O=[t+I*z,e-D*L],W=[l+I*R,h-D*F],G=[l,h];if(O[0]=2*V[0]-O[0],O[1]=2*V[1]-O[1],u)return[O,W,G][P](p);p=[O,W,G][P](p).join()[q](",");for(var X=[],$=0,Z=p.length;$<Z;$++)X[$]=$%2?g(p[$-1],p[$],f).y:g(p[$],p[$+1],f).x;return X},$t=function(t,e,r,i,n,a,s,o,l){var h=1-l;return{x:X(h,3)*t+3*X(h,2)*l*r+3*h*l*l*n+X(l,3)*s,y:X(h,3)*e+3*X(h,2)*l*i+3*h*l*l*a+X(l,3)*o}},Zt=n(function(t,e,r,i,n,a,s,o){var l=n-2*r+t-(s-2*n+r),h=2*(r-t)-2*(n-r),u=t-r,c=(-h+Y.sqrt(h*h-4*l*u))/2/l,f=(-h-Y.sqrt(h*h-4*l*u))/2/l,p=[e,o],d=[t,s],g;return H(c)>"1e12"&&(c=.5),H(f)>"1e12"&&(f=.5),c>0&&c<1&&(g=$t(t,e,r,i,n,a,s,o,c),d.push(g.x),p.push(g.y)),f>0&&f<1&&(g=$t(t,e,r,i,n,a,s,o,f),d.push(g.x),p.push(g.y)),l=a-2*i+e-(o-2*a+i),h=2*(i-e)-2*(a-i),u=e-i,c=(-h+Y.sqrt(h*h-4*l*u))/2/l,f=(-h-Y.sqrt(h*h-4*l*u))/2/l,H(c)>"1e12"&&(c=.5),H(f)>"1e12"&&(f=.5),c>0&&c<1&&(g=$t(t,e,r,i,n,a,s,o,c),d.push(g.x),p.push(g.y)),f>0&&f<1&&(g=$t(t,e,r,i,n,a,s,o,f),d.push(g.x),p.push(g.y)),{min:{x:G[z](0,d),y:G[z](0,p)},max:{x:W[z](0,d),y:W[z](0,p)}}}),Qt=e._path2curve=n(function(t,e){var r=!e&&Vt(t);if(!e&&r.curve)return Yt(r.curve);for(var i=Gt(t),n=e&&Gt(e),a={x:0,y:0,bx:0,by:0,X:0,Y:0,qx:null,qy:null},s={x:0,y:0,bx:0,by:0,X:0,Y:0,qx:null,qy:null},o=(function(t,e,r){var i,n,a={T:1,Q:1};if(!t)return["C",e.x,e.y,e.x,e.y,e.x,e.y];switch(!(t[0]in a)&&(e.qx=e.qy=null),t[0]){case"M":e.X=t[1],e.Y=t[2];break;case"A":t=["C"][P](Ut[z](0,[e.x,e.y][P](t.slice(1))));break;case"S":"C"==r||"S"==r?(i=2*e.x-e.bx,n=2*e.y-e.by):(i=e.x,n=e.y),t=["C",i,n][P](t.slice(1));break;case"T":"Q"==r||"T"==r?(e.qx=2*e.x-e.qx,e.qy=2*e.y-e.qy):(e.qx=e.x,e.qy=e.y),t=["C"][P](Xt(e.x,e.y,e.qx,e.qy,t[1],t[2]));break;case"Q":e.qx=t[1],e.qy=t[2],t=["C"][P](Xt(e.x,e.y,t[1],t[2],t[3],t[4]));break;case"L":t=["C"][P](Ht(e.x,e.y,t[1],t[2]));break;case"H":t=["C"][P](Ht(e.x,e.y,t[1],e.y));break;case"V":t=["C"][P](Ht(e.x,e.y,e.x,t[1]));break;case"Z":t=["C"][P](Ht(e.x,e.y,e.X,e.Y))}return t}),l=function(t,e){if(t[e].length>7){t[e].shift();for(var r=t[e];r.length;)u[e]="A",n&&(c[e]="A"),t.splice(e++,0,["C"][P](r.splice(0,6)));t.splice(e,1),g=W(i.length,n&&n.length||0)}},h=function(t,e,r,a,s){t&&e&&"M"==t[s][0]&&"M"!=e[s][0]&&(e.splice(s,0,["M",a.x,a.y]),r.bx=0,r.by=0,r.x=t[s][1],r.y=t[s][2],g=W(i.length,n&&n.length||0))},u=[],c=[],f="",p="",d=0,g=W(i.length,n&&n.length||0);d<g;d++){i[d]&&(f=i[d][0]),"C"!=f&&(u[d]=f,d&&(p=u[d-1])),i[d]=o(i[d],a,p),"A"!=u[d]&&"C"==f&&(u[d]="C"),l(i,d),n&&(n[d]&&(f=n[d][0]),"C"!=f&&(c[d]=f,d&&(p=c[d-1])),n[d]=o(n[d],s,p),"A"!=c[d]&&"C"==f&&(c[d]="C"),l(n,d)),h(i,n,a,s,d),h(n,i,s,a,d);var v=i[d],x=n&&n[d],y=v.length,m=n&&x.length;a.x=v[y-2],a.y=v[y-1],a.bx=ht(v[y-4])||a.x,a.by=ht(v[y-3])||a.y,s.bx=n&&(ht(x[m-4])||s.x),s.by=n&&(ht(x[m-3])||s.y),s.x=n&&x[m-2],s.y=n&&x[m-1]}return n||(r.curve=Yt(i)),n?[i,n]:i},null,Yt),Jt=e._parseDots=n(function(t){for(var r=[],i=0,n=t.length;i<n;i++){var a={},s=t[i].match(/^([^:]*):?([\d\.]*)/);if(a.color=e.getRGB(s[1]),a.color.error)return null;a.opacity=a.color.opacity,a.color=a.color.hex,s[2]&&(a.offset=s[2]+"%"),r.push(a)}for(i=1,n=r.length-1;i<n;i++)if(!r[i].offset){for(var o=ht(r[i-1].offset||0),l=0,h=i+1;h<n;h++)if(r[h].offset){l=r[h].offset;break}l||(l=100,h=n),l=ht(l);for(var u=(l-o)/(h-i+1);i<h;i++)o+=u,r[i].offset=o+"%"}return r}),Kt=e._tear=function(t,e){t==e.top&&(e.top=t.prev),t==e.bottom&&(e.bottom=t.next),t.next&&(t.next.prev=t.prev),t.prev&&(t.prev.next=t.next)},te=e._tofront=function(t,e){e.top!==t&&(Kt(t,e),t.next=null,t.prev=e.top,e.top.next=t,e.top=t)},ee=e._toback=function(t,e){e.bottom!==t&&(Kt(t,e),t.next=e.bottom,t.prev=null,e.bottom.prev=t,e.bottom=t)},re=e._insertafter=function(t,e,r){Kt(t,r),e==r.top&&(r.top=t),e.next&&(e.next.prev=t),t.next=e.next,t.prev=e,e.next=t},ie=e._insertbefore=function(t,e,r){Kt(t,r),e==r.bottom&&(r.bottom=t),e.prev&&(e.prev.next=t),t.prev=e.prev,e.prev=t,t.next=e},ne=e.toMatrix=function(t,e){var r=Ot(t),i={_:{transform:R},getBBox:function(){return r}};return se(i,e),i.matrix},ae=e.transformPath=function(t,e){return Mt(t,ne(t,e))},se=e._extractTransform=function(t,r){if(null==r)return t._.transform;r=I(r).replace(/\.{3}|\u2026/g,t._.transform||R);var i=e.parseTransformString(r),n=0,a=0,s=0,o=1,l=1,h=t._,u=new g;if(h.transform=i||[],i)for(var c=0,f=i.length;c<f;c++){var p=i[c],d=p.length,v=I(p[0]).toLowerCase(),x=p[0]!=v,y=x?u.invert():0,m,b,_,w,k;"t"==v&&3==d?x?(m=y.x(0,0),b=y.y(0,0),_=y.x(p[1],p[2]),w=y.y(p[1],p[2]),u.translate(_-m,w-b)):u.translate(p[1],p[2]):"r"==v?2==d?(k=k||t.getBBox(1),u.rotate(p[1],k.x+k.width/2,k.y+k.height/2),n+=p[1]):4==d&&(x?(_=y.x(p[2],p[3]),w=y.y(p[2],p[3]),u.rotate(p[1],_,w)):u.rotate(p[1],p[2],p[3]),n+=p[1]):"s"==v?2==d||3==d?(k=k||t.getBBox(1),u.scale(p[1],p[d-1],k.x+k.width/2,k.y+k.height/2),o*=p[1],l*=p[d-1]):5==d&&(x?(_=y.x(p[3],p[4]),w=y.y(p[3],p[4]),u.scale(p[1],p[2],_,w)):u.scale(p[1],p[2],p[3],p[4]),o*=p[1],l*=p[2]):"m"==v&&7==d&&u.add(p[1],p[2],p[3],p[4],p[5],p[6]),h.dirtyT=1,t.matrix=u}t.matrix=u,h.sx=o,h.sy=l,h.deg=n,h.dx=a=u.e,h.dy=s=u.f,1==o&&1==l&&!n&&h.bbox?(h.bbox.x+=+a,h.bbox.y+=+s):h.dirtyT=1},oe=function(t){var e=t[0];switch(e.toLowerCase()){case"t":return[e,0,0];case"m":return[e,1,0,0,1,0,0];case"r":return 4==t.length?[e,0,t[2],t[3]]:[e,0];case"s":return 5==t.length?[e,1,1,t[3],t[4]]:3==t.length?[e,1,1]:[e,1]}},le=e._equaliseTransform=function(t,r){r=I(r).replace(/\.{3}|\u2026/g,t),t=e.parseTransformString(t)||[],r=e.parseTransformString(r)||[];for(var i=W(t.length,r.length),n=[],a=[],s=0,o,l,h,u;s<i;s++){if(h=t[s]||oe(r[s]),u=r[s]||oe(h),h[0]!=u[0]||"r"==h[0].toLowerCase()&&(h[2]!=u[2]||h[3]!=u[3])||"s"==h[0].toLowerCase()&&(h[3]!=u[3]||h[4]!=u[4]))return;for(n[s]=[],a[s]=[],o=0,l=W(h.length,u.length);o<l;o++)o in h&&(n[s][o]=h[o]),o in u&&(a[s][o]=u[o])}return{from:n,to:a}};e._getContainer=function(t,r,i,n){var a;if(a=null!=n||e.is(t,"object")?t:T.doc.getElementById(t),null!=a)return a.tagName?null==r?{container:a,width:a.style.pixelWidth||a.offsetWidth,height:a.style.pixelHeight||a.offsetHeight}:{container:a,width:r,height:i}:{container:1,x:t,y:r,width:i,height:n}},e.pathToRelative=Wt,e._engine={},e.path2curve=Qt,e.matrix=function(t,e,r,i,n,a){return new g(t,e,r,i,n,a)},function(t){function r(t){return t[0]*t[0]+t[1]*t[1]}function i(t){var e=Y.sqrt(r(t));t[0]&&(t[0]/=e),t[1]&&(t[1]/=e)}t.add=function(t,e,r,i,n,a){var s=[[],[],[]],o=[[this.a,this.c,this.e],[this.b,this.d,this.f],[0,0,1]],l=[[t,r,n],[e,i,a],[0,0,1]],h,u,c,f;for(t&&t instanceof g&&(l=[[t.a,t.c,t.e],[t.b,t.d,t.f],[0,0,1]]),h=0;h<3;h++)for(u=0;u<3;u++){for(f=0,c=0;c<3;c++)f+=o[h][c]*l[c][u];s[h][u]=f}this.a=s[0][0],this.b=s[1][0],this.c=s[0][1],this.d=s[1][1],this.e=s[0][2],this.f=s[1][2]},t.invert=function(){var t=this,e=t.a*t.d-t.b*t.c;return new g(t.d/e,-t.b/e,-t.c/e,t.a/e,(t.c*t.f-t.d*t.e)/e,(t.b*t.e-t.a*t.f)/e)},t.clone=function(){return new g(this.a,this.b,this.c,this.d,this.e,this.f)},t.translate=function(t,e){
this.add(1,0,0,1,t,e)},t.scale=function(t,e,r,i){null==e&&(e=t),(r||i)&&this.add(1,0,0,1,r,i),this.add(t,0,0,e,0,0),(r||i)&&this.add(1,0,0,1,-r,-i)},t.rotate=function(t,r,i){t=e.rad(t),r=r||0,i=i||0;var n=+Y.cos(t).toFixed(9),a=+Y.sin(t).toFixed(9);this.add(n,a,-a,n,r,i),this.add(1,0,0,1,-r,-i)},t.x=function(t,e){return t*this.a+e*this.c+this.e},t.y=function(t,e){return t*this.b+e*this.d+this.f},t.get=function(t){return+this[I.fromCharCode(97+t)].toFixed(4)},t.toString=function(){return e.svg?"matrix("+[this.get(0),this.get(1),this.get(2),this.get(3),this.get(4),this.get(5)].join()+")":[this.get(0),this.get(2),this.get(1),this.get(3),0,0].join()},t.toFilter=function(){return"progid:DXImageTransform.Microsoft.Matrix(M11="+this.get(0)+", M12="+this.get(2)+", M21="+this.get(1)+", M22="+this.get(3)+", Dx="+this.get(4)+", Dy="+this.get(5)+", sizingmethod='auto expand')"},t.offset=function(){return[this.e.toFixed(4),this.f.toFixed(4)]},t.split=function(){var t={};t.dx=this.e,t.dy=this.f;var n=[[this.a,this.c],[this.b,this.d]];t.scalex=Y.sqrt(r(n[0])),i(n[0]),t.shear=n[0][0]*n[1][0]+n[0][1]*n[1][1],n[1]=[n[1][0]-n[0][0]*t.shear,n[1][1]-n[0][1]*t.shear],t.scaley=Y.sqrt(r(n[1])),i(n[1]),t.shear/=t.scaley;var a=-n[0][1],s=n[1][1];return s<0?(t.rotate=e.deg(Y.acos(s)),a<0&&(t.rotate=360-t.rotate)):t.rotate=e.deg(Y.asin(a)),t.isSimple=!(+t.shear.toFixed(9)||t.scalex.toFixed(9)!=t.scaley.toFixed(9)&&t.rotate),t.isSuperSimple=!+t.shear.toFixed(9)&&t.scalex.toFixed(9)==t.scaley.toFixed(9)&&!t.rotate,t.noRotation=!+t.shear.toFixed(9)&&!t.rotate,t},t.toTransformString=function(t){var e=t||this[q]();return e.isSimple?(e.scalex=+e.scalex.toFixed(4),e.scaley=+e.scaley.toFixed(4),e.rotate=+e.rotate.toFixed(4),(e.dx||e.dy?"t"+[e.dx,e.dy]:R)+(1!=e.scalex||1!=e.scaley?"s"+[e.scalex,e.scaley,0,0]:R)+(e.rotate?"r"+[e.rotate,0,0]:R)):"m"+[this.get(0),this.get(1),this.get(2),this.get(3),this.get(4),this.get(5)]}}(g.prototype);for(var he=function(){this.returnValue=!1},ue=function(){return this.originalEvent.preventDefault()},ce=function(){this.cancelBubble=!0},fe=function(){return this.originalEvent.stopPropagation()},pe=function(t){var e=T.doc.documentElement.scrollTop||T.doc.body.scrollTop,r=T.doc.documentElement.scrollLeft||T.doc.body.scrollLeft;return{x:t.clientX+r,y:t.clientY+e}},de=function(){return T.doc.addEventListener?function(t,e,r,i){var n=function(t){var e=pe(t);return r.call(i,t,e.x,e.y)};if(t.addEventListener(e,n,!1),F&&V[e]){var a=function(e){for(var n=pe(e),a=e,s=0,o=e.targetTouches&&e.targetTouches.length;s<o;s++)if(e.targetTouches[s].target==t){e=e.targetTouches[s],e.originalEvent=a,e.preventDefault=ue,e.stopPropagation=fe;break}return r.call(i,e,n.x,n.y)};t.addEventListener(V[e],a,!1)}return function(){return t.removeEventListener(e,n,!1),F&&V[e]&&t.removeEventListener(V[e],a,!1),!0}}:T.doc.attachEvent?function(t,e,r,i){var n=function(t){t=t||T.win.event;var e=T.doc.documentElement.scrollTop||T.doc.body.scrollTop,n=T.doc.documentElement.scrollLeft||T.doc.body.scrollLeft,a=t.clientX+n,s=t.clientY+e;return t.preventDefault=t.preventDefault||he,t.stopPropagation=t.stopPropagation||ce,r.call(i,t,a,s)};t.attachEvent("on"+e,n);var a=function(){return t.detachEvent("on"+e,n),!0};return a}:void 0}(),ge=[],ve=function(e){for(var r=e.clientX,i=e.clientY,n=T.doc.documentElement.scrollTop||T.doc.body.scrollTop,a=T.doc.documentElement.scrollLeft||T.doc.body.scrollLeft,s,o=ge.length;o--;){if(s=ge[o],F&&e.touches){for(var l=e.touches.length,h;l--;)if(h=e.touches[l],h.identifier==s.el._drag.id){r=h.clientX,i=h.clientY,(e.originalEvent?e.originalEvent:e).preventDefault();break}}else e.preventDefault();var u=s.el.node,c,f=u.nextSibling,p=u.parentNode,d=u.style.display;T.win.opera&&p.removeChild(u),u.style.display="none",c=s.el.paper.getElementByPoint(r,i),u.style.display=d,T.win.opera&&(f?p.insertBefore(u,f):p.appendChild(u)),c&&t("raphael.drag.over."+s.el.id,s.el,c),r+=a,i+=n,t("raphael.drag.move."+s.el.id,s.move_scope||s.el,r-s.el._drag.x,i-s.el._drag.y,r,i,e)}},xe=function(r){e.unmousemove(ve).unmouseup(xe);for(var i=ge.length,n;i--;)n=ge[i],n.el._drag={},t("raphael.drag.end."+n.el.id,n.end_scope||n.start_scope||n.move_scope||n.el,r);ge=[]},ye=e.el={},me=D.length;me--;)!function(t){e[t]=ye[t]=function(r,i){return e.is(r,"function")&&(this.events=this.events||[],this.events.push({name:t,f:r,unbind:de(this.shape||this.node||T.doc,t,r,i||this)})),this},e["un"+t]=ye["un"+t]=function(r){for(var i=this.events||[],n=i.length;n--;)i[n].name!=t||!e.is(r,"undefined")&&i[n].f!=r||(i[n].unbind(),i.splice(n,1),!i.length&&delete this.events);return this}}(D[me]);ye.data=function(r,i){var n=wt[this.id]=wt[this.id]||{};if(0==arguments.length)return n;if(1==arguments.length){if(e.is(r,"object")){for(var a in r)r[A](a)&&this.data(a,r[a]);return this}return t("raphael.data.get."+this.id,this,n[r],r),n[r]}return n[r]=i,t("raphael.data.set."+this.id,this,i,r),this},ye.removeData=function(t){return null==t?wt[this.id]={}:wt[this.id]&&delete wt[this.id][t],this},ye.getData=function(){return r(wt[this.id]||{})},ye.hover=function(t,e,r,i){return this.mouseover(t,r).mouseout(e,i||r)},ye.unhover=function(t,e){return this.unmouseover(t).unmouseout(e)};var be=[];ye.drag=function(r,i,n,a,s,o){function l(l){(l.originalEvent||l).preventDefault();var h=l.clientX,u=l.clientY,c=T.doc.documentElement.scrollTop||T.doc.body.scrollTop,f=T.doc.documentElement.scrollLeft||T.doc.body.scrollLeft;if(this._drag.id=l.identifier,F&&l.touches)for(var p=l.touches.length,d;p--;)if(d=l.touches[p],this._drag.id=d.identifier,d.identifier==this._drag.id){h=d.clientX,u=d.clientY;break}this._drag.x=h+f,this._drag.y=u+c,!ge.length&&e.mousemove(ve).mouseup(xe),ge.push({el:this,move_scope:a,start_scope:s,end_scope:o}),i&&t.on("raphael.drag.start."+this.id,i),r&&t.on("raphael.drag.move."+this.id,r),n&&t.on("raphael.drag.end."+this.id,n),t("raphael.drag.start."+this.id,s||a||this,l.clientX+f,l.clientY+c,l)}return this._drag={},be.push({el:this,start:l}),this.mousedown(l),this},ye.onDragOver=function(e){e?t.on("raphael.drag.over."+this.id,e):t.unbind("raphael.drag.over."+this.id)},ye.undrag=function(){for(var r=be.length;r--;)be[r].el==this&&(this.unmousedown(be[r].start),be.splice(r,1),t.unbind("raphael.drag.*."+this.id));!be.length&&e.unmousemove(ve).unmouseup(xe),ge=[]},N.circle=function(t,r,i){var n=e._engine.circle(this,t||0,r||0,i||0);return this.__set__&&this.__set__.push(n),n},N.rect=function(t,r,i,n,a){var s=e._engine.rect(this,t||0,r||0,i||0,n||0,a||0);return this.__set__&&this.__set__.push(s),s},N.ellipse=function(t,r,i,n){var a=e._engine.ellipse(this,t||0,r||0,i||0,n||0);return this.__set__&&this.__set__.push(a),a},N.path=function(t){t&&!e.is(t,Z)&&!e.is(t[0],Q)&&(t+=R);var r=e._engine.path(e.format[z](e,arguments),this);return this.__set__&&this.__set__.push(r),r},N.image=function(t,r,i,n,a){var s=e._engine.image(this,t||"about:blank",r||0,i||0,n||0,a||0);return this.__set__&&this.__set__.push(s),s},N.text=function(t,r,i){var n=e._engine.text(this,t||0,r||0,I(i));return this.__set__&&this.__set__.push(n),n},N.set=function(t){!e.is(t,"array")&&(t=Array.prototype.splice.call(arguments,0,arguments.length));var r=new ze(t);return this.__set__&&this.__set__.push(r),r.paper=this,r.type="set",r},N.setStart=function(t){this.__set__=t||this.set()},N.setFinish=function(t){var e=this.__set__;return delete this.__set__,e},N.getSize=function(){var t=this.canvas.parentNode;return{width:t.offsetWidth,height:t.offsetHeight}},N.setSize=function(t,r){return e._engine.setSize.call(this,t,r)},N.setViewBox=function(t,r,i,n,a){return e._engine.setViewBox.call(this,t,r,i,n,a)},N.top=N.bottom=null,N.raphael=e;var _e=function(t){var e=t.getBoundingClientRect(),r=t.ownerDocument,i=r.body,n=r.documentElement,a=n.clientTop||i.clientTop||0,s=n.clientLeft||i.clientLeft||0,o=e.top+(T.win.pageYOffset||n.scrollTop||i.scrollTop)-a,l=e.left+(T.win.pageXOffset||n.scrollLeft||i.scrollLeft)-s;return{y:o,x:l}};N.getElementByPoint=function(t,e){var r=this,i=r.canvas,n=T.doc.elementFromPoint(t,e);if(T.win.opera&&"svg"==n.tagName){var a=_e(i),s=i.createSVGRect();s.x=t-a.x,s.y=e-a.y,s.width=s.height=1;var o=i.getIntersectionList(s,null);o.length&&(n=o[o.length-1])}if(!n)return null;for(;n.parentNode&&n!=i.parentNode&&!n.raphael;)n=n.parentNode;return n==r.canvas.parentNode&&(n=i),n=n&&n.raphael?r.getById(n.raphaelid):null},N.getElementsByBBox=function(t){var r=this.set();return this.forEach(function(i){e.isBBoxIntersect(i.getBBox(),t)&&r.push(i)}),r},N.getById=function(t){for(var e=this.bottom;e;){if(e.id==t)return e;e=e.next}return null},N.forEach=function(t,e){for(var r=this.bottom;r;){if(t.call(e,r)===!1)return this;r=r.next}return this},N.getElementsByPoint=function(t,e){var r=this.set();return this.forEach(function(i){i.isPointInside(t,e)&&r.push(i)}),r},ye.isPointInside=function(t,r){var i=this.realPath=Et[this.type](this);return this.attr("transform")&&this.attr("transform").length&&(i=e.transformPath(i,this.attr("transform"))),e.isPointInsidePath(i,t,r)},ye.getBBox=function(t){if(this.removed)return{};var e=this._;return t?(!e.dirty&&e.bboxwt||(this.realPath=Et[this.type](this),e.bboxwt=Ot(this.realPath),e.bboxwt.toString=x,e.dirty=0),e.bboxwt):((e.dirty||e.dirtyT||!e.bbox)&&(!e.dirty&&this.realPath||(e.bboxwt=0,this.realPath=Et[this.type](this)),e.bbox=Ot(Mt(this.realPath,this.matrix)),e.bbox.toString=x,e.dirty=e.dirtyT=0),e.bbox)},ye.clone=function(){if(this.removed)return null;var t=this.paper[this.type]().attr(this.attr());return this.__set__&&this.__set__.push(t),t},ye.glow=function(t){if("text"==this.type)return null;t=t||{};var e={width:(t.width||10)+(+this.attr("stroke-width")||1),fill:t.fill||!1,opacity:null==t.opacity?.5:t.opacity,offsetx:t.offsetx||0,offsety:t.offsety||0,color:t.color||"#000"},r=e.width/2,i=this.paper,n=i.set(),a=this.realPath||Et[this.type](this);a=this.matrix?Mt(a,this.matrix):a;for(var s=1;s<r+1;s++)n.push(i.path(a).attr({stroke:e.color,fill:e.fill?e.color:"none","stroke-linejoin":"round","stroke-linecap":"round","stroke-width":+(e.width/r*s).toFixed(3),opacity:+(e.opacity/r).toFixed(3)}));return n.insertBefore(this).translate(e.offsetx,e.offsety)};var we={},ke=function(t,r,i,n,a,s,o,u,c){return null==c?l(t,r,i,n,a,s,o,u):e.findDotsAtSegment(t,r,i,n,a,s,o,u,h(t,r,i,n,a,s,o,u,c))},Be=function(t,r){return function(i,n,a){i=Qt(i);for(var s,o,l,h,u="",c={},f,p=0,d=0,g=i.length;d<g;d++){if(l=i[d],"M"==l[0])s=+l[1],o=+l[2];else{if(h=ke(s,o,l[1],l[2],l[3],l[4],l[5],l[6]),p+h>n){if(r&&!c.start){if(f=ke(s,o,l[1],l[2],l[3],l[4],l[5],l[6],n-p),u+=["C"+f.start.x,f.start.y,f.m.x,f.m.y,f.x,f.y],a)return u;c.start=u,u=["M"+f.x,f.y+"C"+f.n.x,f.n.y,f.end.x,f.end.y,l[5],l[6]].join(),p+=h,s=+l[5],o=+l[6];continue}if(!t&&!r)return f=ke(s,o,l[1],l[2],l[3],l[4],l[5],l[6],n-p),{x:f.x,y:f.y,alpha:f.alpha}}p+=h,s=+l[5],o=+l[6]}u+=l.shift()+l}return c.end=u,f=t?p:r?c:e.findDotsAtSegment(s,o,l[0],l[1],l[2],l[3],l[4],l[5],1),f.alpha&&(f={x:f.x,y:f.y,alpha:f.alpha}),f}},Ce=Be(1),Se=Be(),Ae=Be(0,1);e.getTotalLength=Ce,e.getPointAtLength=Se,e.getSubpath=function(t,e,r){if(this.getTotalLength(t)-r<1e-6)return Ae(t,e).end;var i=Ae(t,r,1);return e?Ae(i,e).end:i},ye.getTotalLength=function(){var t=this.getPath();if(t)return this.node.getTotalLength?this.node.getTotalLength():Ce(t)},ye.getPointAtLength=function(t){var e=this.getPath();if(e)return Se(e,t)},ye.getPath=function(){var t,r=e._getPath[this.type];if("text"!=this.type&&"set"!=this.type)return r&&(t=r(this)),t},ye.getSubpath=function(t,r){var i=this.getPath();if(i)return e.getSubpath(i,t,r)};var Te=e.easing_formulas={linear:function(t){return t},"<":function(t){return X(t,1.7)},">":function(t){return X(t,.48)},"<>":function(t){var e=.48-t/1.04,r=Y.sqrt(.1734+e*e),i=r-e,n=X(H(i),1/3)*(i<0?-1:1),a=-r-e,s=X(H(a),1/3)*(a<0?-1:1),o=n+s+.5;return 3*(1-o)*o*o+o*o*o},backIn:function(t){var e=1.70158;return t*t*((e+1)*t-e)},backOut:function(t){t-=1;var e=1.70158;return t*t*((e+1)*t+e)+1},elastic:function(t){return t==!!t?t:X(2,-10*t)*Y.sin((t-.075)*(2*U)/.3)+1},bounce:function(t){var e=7.5625,r=2.75,i;return t<1/r?i=e*t*t:t<2/r?(t-=1.5/r,i=e*t*t+.75):t<2.5/r?(t-=2.25/r,i=e*t*t+.9375):(t-=2.625/r,i=e*t*t+.984375),i}};Te.easeIn=Te["ease-in"]=Te["<"],Te.easeOut=Te["ease-out"]=Te[">"],Te.easeInOut=Te["ease-in-out"]=Te["<>"],Te["back-in"]=Te.backIn,Te["back-out"]=Te.backOut;var Ee=[],Me=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(t){setTimeout(t,16)},Ne=function(){for(var r=+new Date,i=0;i<Ee.length;i++){var n=Ee[i];if(!n.el.removed&&!n.paused){var a=r-n.start,s=n.ms,o=n.easing,l=n.from,h=n.diff,u=n.to,c=n.t,f=n.el,p={},d,g={},v;if(n.initstatus?(a=(n.initstatus*n.anim.top-n.prev)/(n.percent-n.prev)*s,n.status=n.initstatus,delete n.initstatus,n.stop&&Ee.splice(i--,1)):n.status=(n.prev+(n.percent-n.prev)*(a/s))/n.anim.top,!(a<0))if(a<s){var x=o(a/s);for(var y in l)if(l[A](y)){switch(pt[y]){case $:d=+l[y]+x*s*h[y];break;case"colour":d="rgb("+[Le(ot(l[y].r+x*s*h[y].r)),Le(ot(l[y].g+x*s*h[y].g)),Le(ot(l[y].b+x*s*h[y].b))].join(",")+")";break;case"path":d=[];for(var m=0,_=l[y].length;m<_;m++){d[m]=[l[y][m][0]];for(var w=1,k=l[y][m].length;w<k;w++)d[m][w]=+l[y][m][w]+x*s*h[y][m][w];d[m]=d[m].join(j)}d=d.join(j);break;case"transform":if(h[y].real)for(d=[],m=0,_=l[y].length;m<_;m++)for(d[m]=[l[y][m][0]],w=1,k=l[y][m].length;w<k;w++)d[m][w]=l[y][m][w]+x*s*h[y][m][w];else{var B=function(t){return+l[y][t]+x*s*h[y][t]};d=[["m",B(0),B(1),B(2),B(3),B(4),B(5)]]}break;case"csv":if("clip-rect"==y)for(d=[],m=4;m--;)d[m]=+l[y][m]+x*s*h[y][m];break;default:var C=[][P](l[y]);for(d=[],m=f.paper.customAttributes[y].length;m--;)d[m]=+C[m]+x*s*h[y][m]}p[y]=d}f.attr(p),function(e,r,i){setTimeout(function(){t("raphael.anim.frame."+e,r,i)})}(f.id,f,n.anim)}else{if(function(r,i,n){setTimeout(function(){t("raphael.anim.frame."+i.id,i,n),t("raphael.anim.finish."+i.id,i,n),e.is(r,"function")&&r.call(i)})}(n.callback,f,n.anim),f.attr(u),Ee.splice(i--,1),n.repeat>1&&!n.next){for(v in u)u[A](v)&&(g[v]=n.totalOrigin[v]);n.el.attr(g),b(n.anim,n.el,n.anim.percents[0],null,n.totalOrigin,n.repeat-1)}n.next&&!n.stop&&b(n.anim,n.el,n.next,null,n.totalOrigin,n.repeat)}}}Ee.length&&Me(Ne)},Le=function(t){return t>255?255:t<0?0:t};ye.animateWith=function(t,r,i,n,a,s){var o=this;if(o.removed)return s&&s.call(o),o;var l=i instanceof m?i:e.animation(i,n,a,s),h,u;b(l,o,l.percents[0],null,o.attr());for(var c=0,f=Ee.length;c<f;c++)if(Ee[c].anim==r&&Ee[c].el==t){Ee[f-1].start=Ee[c].start;break}return o},ye.onAnimation=function(e){return e?t.on("raphael.anim.frame."+this.id,e):t.unbind("raphael.anim.frame."+this.id),this},m.prototype.delay=function(t){var e=new m(this.anim,this.ms);return e.times=this.times,e.del=+t||0,e},m.prototype.repeat=function(t){var e=new m(this.anim,this.ms);return e.del=this.del,e.times=Y.floor(W(t,0))||1,e},e.animation=function(t,r,i,n){if(t instanceof m)return t;!e.is(i,"function")&&i||(n=n||i||null,i=null),t=Object(t),r=+r||0;var a={},s,o;for(o in t)t[A](o)&&ht(o)!=o&&ht(o)+"%"!=o&&(s=!0,a[o]=t[o]);if(s)return i&&(a.easing=i),n&&(a.callback=n),new m({100:a},r);if(n){var l=0;for(var h in t){var u=ut(h);t[A](h)&&u>l&&(l=u)}l+="%",!t[l].callback&&(t[l].callback=n)}return new m(t,r)},ye.animate=function(t,r,i,n){var a=this;if(a.removed)return n&&n.call(a),a;var s=t instanceof m?t:e.animation(t,r,i,n);return b(s,a,s.percents[0],null,a.attr()),a},ye.setTime=function(t,e){return t&&null!=e&&this.status(t,G(e,t.ms)/t.ms),this},ye.status=function(t,e){var r=[],i=0,n,a;if(null!=e)return b(t,this,-1,G(e,1)),this;for(n=Ee.length;i<n;i++)if(a=Ee[i],a.el.id==this.id&&(!t||a.anim==t)){if(t)return a.status;r.push({anim:a.anim,status:a.status})}return t?0:r},ye.pause=function(e){for(var r=0;r<Ee.length;r++)Ee[r].el.id!=this.id||e&&Ee[r].anim!=e||t("raphael.anim.pause."+this.id,this,Ee[r].anim)!==!1&&(Ee[r].paused=!0);return this},ye.resume=function(e){for(var r=0;r<Ee.length;r++)if(Ee[r].el.id==this.id&&(!e||Ee[r].anim==e)){var i=Ee[r];t("raphael.anim.resume."+this.id,this,i.anim)!==!1&&(delete i.paused,this.status(i.anim,i.status))}return this},ye.stop=function(e){for(var r=0;r<Ee.length;r++)Ee[r].el.id!=this.id||e&&Ee[r].anim!=e||t("raphael.anim.stop."+this.id,this,Ee[r].anim)!==!1&&Ee.splice(r--,1);return this},t.on("raphael.remove",_),t.on("raphael.clear",_),ye.toString=function(){return"Raphaël’s object"};var ze=function(t){if(this.items=[],this.length=0,this.type="set",t)for(var e=0,r=t.length;e<r;e++)!t[e]||t[e].constructor!=ye.constructor&&t[e].constructor!=ze||(this[this.items.length]=this.items[this.items.length]=t[e],this.length++)},Pe=ze.prototype;Pe.push=function(){for(var t,e,r=0,i=arguments.length;r<i;r++)t=arguments[r],!t||t.constructor!=ye.constructor&&t.constructor!=ze||(e=this.items.length,this[e]=this.items[e]=t,this.length++);return this},Pe.pop=function(){return this.length&&delete this[this.length--],this.items.pop()},Pe.forEach=function(t,e){for(var r=0,i=this.items.length;r<i;r++)if(t.call(e,this.items[r],r)===!1)return this;return this};for(var Fe in ye)ye[A](Fe)&&(Pe[Fe]=function(t){return function(){var e=arguments;return this.forEach(function(r){r[t][z](r,e)})}}(Fe));return Pe.attr=function(t,r){if(t&&e.is(t,Q)&&e.is(t[0],"object"))for(var i=0,n=t.length;i<n;i++)this.items[i].attr(t[i]);else for(var a=0,s=this.items.length;a<s;a++)this.items[a].attr(t,r);return this},Pe.clear=function(){for(;this.length;)this.pop()},Pe.splice=function(t,e,r){t=t<0?W(this.length+t,0):t,e=W(0,G(this.length-t,e));var i=[],n=[],a=[],s;for(s=2;s<arguments.length;s++)a.push(arguments[s]);for(s=0;s<e;s++)n.push(this[t+s]);for(;s<this.length-t;s++)i.push(this[t+s]);var o=a.length;for(s=0;s<o+i.length;s++)this.items[t+s]=this[t+s]=s<o?a[s]:i[s-o];for(s=this.items.length=this.length-=e-o;this[s];)delete this[s++];return new ze(n)},Pe.exclude=function(t){for(var e=0,r=this.length;e<r;e++)if(this[e]==t)return this.splice(e,1),!0},Pe.animate=function(t,r,i,n){(e.is(i,"function")||!i)&&(n=i||null);var a=this.items.length,s=a,o,l=this,h;if(!a)return this;n&&(h=function(){!--a&&n.call(l)}),i=e.is(i,Z)?i:h;var u=e.animation(t,r,i,h);for(o=this.items[--s].animate(u);s--;)this.items[s]&&!this.items[s].removed&&this.items[s].animateWith(o,u,u),this.items[s]&&!this.items[s].removed||a--;return this},Pe.insertAfter=function(t){for(var e=this.items.length;e--;)this.items[e].insertAfter(t);return this},Pe.getBBox=function(){for(var t=[],e=[],r=[],i=[],n=this.items.length;n--;)if(!this.items[n].removed){var a=this.items[n].getBBox();t.push(a.x),e.push(a.y),r.push(a.x+a.width),i.push(a.y+a.height)}return t=G[z](0,t),e=G[z](0,e),r=W[z](0,r),i=W[z](0,i),{x:t,y:e,x2:r,y2:i,width:r-t,height:i-e}},Pe.clone=function(t){t=this.paper.set();for(var e=0,r=this.items.length;e<r;e++)t.push(this.items[e].clone());return t},Pe.toString=function(){return"Raphaël‘s set"},Pe.glow=function(t){var e=this.paper.set();return this.forEach(function(r,i){var n=r.glow(t);null!=n&&n.forEach(function(t,r){e.push(t)})}),e},Pe.isPointInside=function(t,e){var r=!1;return this.forEach(function(i){if(i.isPointInside(t,e))return r=!0,!1}),r},e.registerFont=function(t){if(!t.face)return t;this.fonts=this.fonts||{};var e={w:t.w,face:{},glyphs:{}},r=t.face["font-family"];for(var i in t.face)t.face[A](i)&&(e.face[i]=t.face[i]);if(this.fonts[r]?this.fonts[r].push(e):this.fonts[r]=[e],!t.svg){e.face["units-per-em"]=ut(t.face["units-per-em"],10);for(var n in t.glyphs)if(t.glyphs[A](n)){var a=t.glyphs[n];if(e.glyphs[n]={w:a.w,k:{},d:a.d&&"M"+a.d.replace(/[mlcxtrv]/g,function(t){return{l:"L",c:"C",x:"z",t:"m",r:"l",v:"c"}[t]||"M"})+"z"},a.k)for(var s in a.k)a[A](s)&&(e.glyphs[n].k[s]=a.k[s])}}return t},N.getFont=function(t,r,i,n){if(n=n||"normal",i=i||"normal",r=+r||{normal:400,bold:700,lighter:300,bolder:800}[r]||400,e.fonts){var a=e.fonts[t];if(!a){var s=new RegExp("(^|\\s)"+t.replace(/[^\w\d\s+!~.:_-]/g,R)+"(\\s|$)","i");for(var o in e.fonts)if(e.fonts[A](o)&&s.test(o)){a=e.fonts[o];break}}var l;if(a)for(var h=0,u=a.length;h<u&&(l=a[h],l.face["font-weight"]!=r||l.face["font-style"]!=i&&l.face["font-style"]||l.face["font-stretch"]!=n);h++);return l}},N.print=function(t,r,i,n,a,s,o,l){s=s||"middle",o=W(G(o||0,1),-1),l=W(G(l||1,3),1);var h=I(i)[q](R),u=0,c=0,f=R,p;if(e.is(n,"string")&&(n=this.getFont(n)),n){p=(a||16)/n.face["units-per-em"];for(var d=n.face.bbox[q](k),g=+d[0],v=d[3]-d[1],x=0,y=+d[1]+("baseline"==s?v+ +n.face.descent:v/2),m=0,b=h.length;m<b;m++){if("\n"==h[m])u=0,w=0,c=0,x+=v*l;else{var _=c&&n.glyphs[h[m-1]]||{},w=n.glyphs[h[m]];u+=c?(_.w||n.w)+(_.k&&_.k[h[m]]||0)+n.w*o:0,c=1}w&&w.d&&(f+=e.transformPath(w.d,["t",u*p,x*p,"s",p,p,g,y,"t",(t-g)/p,(r-y)/p]))}}return this.path(f).attr({fill:"#000",stroke:"none"})},N.add=function(t){if(e.is(t,"array"))for(var r=this.set(),i=0,n=t.length,a;i<n;i++)a=t[i]||{},B[A](a.type)&&r.push(this[a.type]().attr(a));return r},e.format=function(t,r){var i=e.is(r,Q)?[0][P](r):arguments;return t&&e.is(t,Z)&&i.length-1&&(t=t.replace(C,function(t,e){return null==i[++e]?R:i[e]})),t||R},e.fullfill=function(){var t=/\{([^\}]+)\}/g,e=/(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g,r=function(t,r,i){var n=i;return r.replace(e,function(t,e,r,i,a){e=e||i,n&&(e in n&&(n=n[e]),"function"==typeof n&&a&&(n=n()))}),n=(null==n||n==i?t:n)+""};return function(e,i){return String(e).replace(t,function(t,e){return r(t,e,i)})}}(),e.ninja=function(){if(E.was)T.win.Raphael=E.is;else{window.Raphael=void 0;try{delete window.Raphael}catch(t){}}return e},e.st=Pe,t.on("raphael.DOMload",function(){w=!0}),function(t,r,i){function n(){/in/.test(t.readyState)?setTimeout(n,9):e.eve("raphael.DOMload")}null==t.readyState&&t.addEventListener&&(t.addEventListener(r,i=function(){t.removeEventListener(r,i,!1),t.readyState="complete"},!1),t.readyState="loading"),n()}(document,"DOMContentLoaded"),e}.apply(e,i),!(void 0!==n&&(t.exports=n))},function(t,e,r){var i,n;!function(r){var a="0.5.0",s="hasOwnProperty",o=/[\.\/]/,l=/\s*,\s*/,h="*",u=function(){},c=function(t,e){return t-e},f,p,d={n:{}},g=function(){for(var t=0,e=this.length;t<e;t++)if("undefined"!=typeof this[t])return this[t]},v=function(){for(var t=this.length;--t;)if("undefined"!=typeof this[t])return this[t]},x=Object.prototype.toString,y=String,m=Array.isArray||function(t){return t instanceof Array||"[object Array]"==x.call(t)};eve=function(t,e){var r=d,i=p,n=Array.prototype.slice.call(arguments,2),a=eve.listeners(t),s=0,o=!1,l,h=[],u={},x=[],y=f,m=[];x.firstDefined=g,x.lastDefined=v,f=t,p=0;for(var b=0,_=a.length;b<_;b++)"zIndex"in a[b]&&(h.push(a[b].zIndex),a[b].zIndex<0&&(u[a[b].zIndex]=a[b]));for(h.sort(c);h[s]<0;)if(l=u[h[s++]],x.push(l.apply(e,n)),p)return p=i,x;for(b=0;b<_;b++)if(l=a[b],"zIndex"in l)if(l.zIndex==h[s]){if(x.push(l.apply(e,n)),p)break;do if(s++,l=u[h[s]],l&&x.push(l.apply(e,n)),p)break;while(l)}else u[l.zIndex]=l;else if(x.push(l.apply(e,n)),p)break;return p=i,f=y,x},eve._events=d,eve.listeners=function(t){var e=m(t)?t:t.split(o),r=d,i,n,a,s,l,u,c,f,p=[r],g=[];for(s=0,l=e.length;s<l;s++){for(f=[],u=0,c=p.length;u<c;u++)for(r=p[u].n,n=[r[e[s]],r[h]],a=2;a--;)i=n[a],i&&(f.push(i),g=g.concat(i.f||[]));p=f}return g},eve.separator=function(t){t?(t=y(t).replace(/(?=[\.\^\]\[\-])/g,"\\"),t="["+t+"]",o=new RegExp(t)):o=/[\.\/]/},eve.on=function(t,e){if("function"!=typeof e)return function(){};for(var r=m(t)?m(t[0])?t:[t]:y(t).split(l),i=0,n=r.length;i<n;i++)!function(t){for(var r=m(t)?t:y(t).split(o),i=d,n,a=0,s=r.length;a<s;a++)i=i.n,i=i.hasOwnProperty(r[a])&&i[r[a]]||(i[r[a]]={n:{}});for(i.f=i.f||[],a=0,s=i.f.length;a<s;a++)if(i.f[a]==e){n=!0;break}!n&&i.f.push(e)}(r[i]);return function(t){+t==+t&&(e.zIndex=+t)}},eve.f=function(t){var e=[].slice.call(arguments,1);return function(){eve.apply(null,[t,null].concat(e).concat([].slice.call(arguments,0)))}},eve.stop=function(){p=1},eve.nt=function(t){var e=m(f)?f.join("."):f;return t?new RegExp("(?:\\.|\\/|^)"+t+"(?:\\.|\\/|$)").test(e):e},eve.nts=function(){return m(f)?f:f.split(o)},eve.off=eve.unbind=function(t,e){if(!t)return void(eve._events=d={n:{}});var r=m(t)?m(t[0])?t:[t]:y(t).split(l);if(r.length>1)for(var i=0,n=r.length;i<n;i++)eve.off(r[i],e);else{r=m(t)?t:y(t).split(o);var a,u,c,i,n,f,p,g=[d];for(i=0,n=r.length;i<n;i++)for(f=0;f<g.length;f+=c.length-2){if(c=[f,1],a=g[f].n,r[i]!=h)a[r[i]]&&c.push(a[r[i]]);else for(u in a)a[s](u)&&c.push(a[u]);g.splice.apply(g,c)}for(i=0,n=g.length;i<n;i++)for(a=g[i];a.n;){if(e){if(a.f){for(f=0,p=a.f.length;f<p;f++)if(a.f[f]==e){a.f.splice(f,1);break}!a.f.length&&delete a.f}for(u in a.n)if(a.n[s](u)&&a.n[u].f){var v=a.n[u].f;for(f=0,p=v.length;f<p;f++)if(v[f]==e){v.splice(f,1);break}!v.length&&delete a.n[u].f}}else{delete a.f;for(u in a.n)a.n[s](u)&&a.n[u].f&&delete a.n[u].f}a=a.n}}},eve.once=function(t,e){var r=function(){return eve.off(t,r),e.apply(this,arguments)};return eve.on(t,r)},eve.version=a,eve.toString=function(){return"You are running Eve "+a},"undefined"!=typeof t&&t.exports?t.exports=eve:(i=[],n=function(){return eve}.apply(e,i),!(void 0!==n&&(t.exports=n)))}(this)},function(t,e,r){var i,n;i=[r(1)],n=function(t){if(!t||t.svg){var e="hasOwnProperty",r=String,i=parseFloat,n=parseInt,a=Math,s=a.max,o=a.abs,l=a.pow,h=/[, ]+/,u=t.eve,c="",f=" ",p="http://www.w3.org/1999/xlink",d={block:"M5,0 0,2.5 5,5z",classic:"M5,0 0,2.5 5,5 3.5,3 3.5,2z",diamond:"M2.5,0 5,2.5 2.5,5 0,2.5z",open:"M6,1 1,3.5 6,6",oval:"M2.5,0A2.5,2.5,0,0,1,2.5,5 2.5,2.5,0,0,1,2.5,0z"},g={};t.toString=function(){return"Your browser supports SVG.\nYou are running Raphaël "+this.version};var v=function(i,n){if(n){"string"==typeof i&&(i=v(i));for(var a in n)n[e](a)&&("xlink:"==a.substring(0,6)?i.setAttributeNS(p,a.substring(6),r(n[a])):i.setAttribute(a,r(n[a])))}else i=t._g.doc.createElementNS("http://www.w3.org/2000/svg",i),i.style&&(i.style.webkitTapHighlightColor="rgba(0,0,0,0)");return i},x=function(e,n){var h="linear",u=e.id+n,f=.5,p=.5,d=e.node,g=e.paper,x=d.style,y=t._g.doc.getElementById(u);if(!y){if(n=r(n).replace(t._radial_gradient,function(t,e,r){if(h="radial",e&&r){f=i(e),p=i(r);var n=2*(p>.5)-1;l(f-.5,2)+l(p-.5,2)>.25&&(p=a.sqrt(.25-l(f-.5,2))*n+.5)&&.5!=p&&(p=p.toFixed(5)-1e-5*n)}return c}),n=n.split(/\s*\-\s*/),"linear"==h){var b=n.shift();if(b=-i(b),isNaN(b))return null;var _=[0,0,a.cos(t.rad(b)),a.sin(t.rad(b))],w=1/(s(o(_[2]),o(_[3]))||1);_[2]*=w,_[3]*=w,_[2]<0&&(_[0]=-_[2],_[2]=0),_[3]<0&&(_[1]=-_[3],_[3]=0)}var k=t._parseDots(n);if(!k)return null;if(u=u.replace(/[\(\)\s,\xb0#]/g,"_"),e.gradient&&u!=e.gradient.id&&(g.defs.removeChild(e.gradient),delete e.gradient),!e.gradient){y=v(h+"Gradient",{id:u}),e.gradient=y,v(y,"radial"==h?{fx:f,fy:p}:{x1:_[0],y1:_[1],x2:_[2],y2:_[3],gradientTransform:e.matrix.invert()}),g.defs.appendChild(y);for(var B=0,C=k.length;B<C;B++)y.appendChild(v("stop",{offset:k[B].offset?k[B].offset:B?"100%":"0%","stop-color":k[B].color||"#fff","stop-opacity":isFinite(k[B].opacity)?k[B].opacity:1}))}}return v(d,{fill:m(u),opacity:1,"fill-opacity":1}),x.fill=c,x.opacity=1,x.fillOpacity=1,1},y=function(){var t=document.documentMode;return t&&(9===t||10===t)},m=function(t){if(y())return"url('#"+t+"')";var e=document.location,r=e.protocol+"//"+e.host+e.pathname+e.search;return"url('"+r+"#"+t+"')"},b=function(t){var e=t.getBBox(1);v(t.pattern,{patternTransform:t.matrix.invert()+" translate("+e.x+","+e.y+")"})},_=function(i,n,a){if("path"==i.type){for(var s=r(n).toLowerCase().split("-"),o=i.paper,l=a?"end":"start",h=i.node,u=i.attrs,f=u["stroke-width"],p=s.length,x="classic",y,m,b,_,w,k=3,B=3,C=5;p--;)switch(s[p]){case"block":case"classic":case"oval":case"diamond":case"open":case"none":x=s[p];break;case"wide":B=5;break;case"narrow":B=2;break;case"long":k=5;break;case"short":k=2}if("open"==x?(k+=2,B+=2,C+=2,b=1,_=a?4:1,w={fill:"none",stroke:u.stroke}):(_=b=k/2,w={fill:u.stroke,stroke:"none"}),i._.arrows?a?(i._.arrows.endPath&&g[i._.arrows.endPath]--,i._.arrows.endMarker&&g[i._.arrows.endMarker]--):(i._.arrows.startPath&&g[i._.arrows.startPath]--,i._.arrows.startMarker&&g[i._.arrows.startMarker]--):i._.arrows={},"none"!=x){var S="raphael-marker-"+x,A="raphael-marker-"+l+x+k+B+"-obj"+i.id;t._g.doc.getElementById(S)?g[S]++:(o.defs.appendChild(v(v("path"),{"stroke-linecap":"round",d:d[x],id:S})),g[S]=1);var T=t._g.doc.getElementById(A),E;T?(g[A]++,E=T.getElementsByTagName("use")[0]):(T=v(v("marker"),{id:A,markerHeight:B,markerWidth:k,orient:"auto",refX:_,refY:B/2}),E=v(v("use"),{"xlink:href":"#"+S,transform:(a?"rotate(180 "+k/2+" "+B/2+") ":c)+"scale("+k/C+","+B/C+")","stroke-width":(1/((k/C+B/C)/2)).toFixed(4)}),T.appendChild(E),o.defs.appendChild(T),g[A]=1),v(E,w);var M=b*("diamond"!=x&&"oval"!=x);a?(y=i._.arrows.startdx*f||0,m=t.getTotalLength(u.path)-M*f):(y=M*f,m=t.getTotalLength(u.path)-(i._.arrows.enddx*f||0)),w={},w["marker-"+l]="url(#"+A+")",(m||y)&&(w.d=t.getSubpath(u.path,y,m)),v(h,w),i._.arrows[l+"Path"]=S,i._.arrows[l+"Marker"]=A,i._.arrows[l+"dx"]=M,i._.arrows[l+"Type"]=x,i._.arrows[l+"String"]=n}else a?(y=i._.arrows.startdx*f||0,m=t.getTotalLength(u.path)-y):(y=0,m=t.getTotalLength(u.path)-(i._.arrows.enddx*f||0)),i._.arrows[l+"Path"]&&v(h,{d:t.getSubpath(u.path,y,m)}),delete i._.arrows[l+"Path"],delete i._.arrows[l+"Marker"],delete i._.arrows[l+"dx"],delete i._.arrows[l+"Type"],delete i._.arrows[l+"String"];for(w in g)if(g[e](w)&&!g[w]){var N=t._g.doc.getElementById(w);N&&N.parentNode.removeChild(N)}}},w={"-":[3,1],".":[1,1],"-.":[3,1,1,1],"-..":[3,1,1,1,1,1],". ":[1,3],"- ":[4,3],"--":[8,3],"- .":[4,3,1,3],"--.":[8,3,1,3],"--..":[8,3,1,3,1,3]},k=function(t,e,i){if(e=w[r(e).toLowerCase()]){for(var n=t.attrs["stroke-width"]||"1",a={round:n,square:n,butt:0}[t.attrs["stroke-linecap"]||i["stroke-linecap"]]||0,s=[],o=e.length;o--;)s[o]=e[o]*n+(o%2?1:-1)*a;v(t.node,{"stroke-dasharray":s.join(",")})}else v(t.node,{"stroke-dasharray":"none"})},B=function(i,a){var l=i.node,u=i.attrs,f=l.style.visibility;l.style.visibility="hidden";for(var d in a)if(a[e](d)){if(!t._availableAttrs[e](d))continue;var g=a[d];switch(u[d]=g,d){case"blur":i.blur(g);break;case"title":var y=l.getElementsByTagName("title");if(y.length&&(y=y[0]))y.firstChild.nodeValue=g;else{y=v("title");var m=t._g.doc.createTextNode(g);y.appendChild(m),l.appendChild(y)}break;case"href":case"target":var w=l.parentNode;if("a"!=w.tagName.toLowerCase()){var B=v("a");w.insertBefore(B,l),B.appendChild(l),w=B}"target"==d?w.setAttributeNS(p,"show","blank"==g?"new":g):w.setAttributeNS(p,d,g);break;case"cursor":l.style.cursor=g;break;case"transform":i.transform(g);break;case"arrow-start":_(i,g);break;case"arrow-end":_(i,g,1);break;case"clip-rect":var C=r(g).split(h);if(4==C.length){i.clip&&i.clip.parentNode.parentNode.removeChild(i.clip.parentNode);var A=v("clipPath"),T=v("rect");A.id=t.createUUID(),v(T,{x:C[0],y:C[1],width:C[2],height:C[3]}),A.appendChild(T),i.paper.defs.appendChild(A),v(l,{"clip-path":"url(#"+A.id+")"}),i.clip=T}if(!g){var E=l.getAttribute("clip-path");if(E){var M=t._g.doc.getElementById(E.replace(/(^url\(#|\)$)/g,c));M&&M.parentNode.removeChild(M),v(l,{"clip-path":c}),delete i.clip}}break;case"path":"path"==i.type&&(v(l,{d:g?u.path=t._pathToAbsolute(g):"M0,0"}),i._.dirty=1,i._.arrows&&("startString"in i._.arrows&&_(i,i._.arrows.startString),"endString"in i._.arrows&&_(i,i._.arrows.endString,1)));break;case"width":if(l.setAttribute(d,g),i._.dirty=1,!u.fx)break;d="x",g=u.x;case"x":u.fx&&(g=-u.x-(u.width||0));case"rx":if("rx"==d&&"rect"==i.type)break;case"cx":l.setAttribute(d,g),i.pattern&&b(i),i._.dirty=1;break;case"height":if(l.setAttribute(d,g),i._.dirty=1,!u.fy)break;d="y",g=u.y;case"y":u.fy&&(g=-u.y-(u.height||0));case"ry":if("ry"==d&&"rect"==i.type)break;case"cy":l.setAttribute(d,g),i.pattern&&b(i),i._.dirty=1;break;case"r":"rect"==i.type?v(l,{rx:g,ry:g}):l.setAttribute(d,g),i._.dirty=1;break;case"src":"image"==i.type&&l.setAttributeNS(p,"href",g);break;case"stroke-width":1==i._.sx&&1==i._.sy||(g/=s(o(i._.sx),o(i._.sy))||1),l.setAttribute(d,g),u["stroke-dasharray"]&&k(i,u["stroke-dasharray"],a),
i._.arrows&&("startString"in i._.arrows&&_(i,i._.arrows.startString),"endString"in i._.arrows&&_(i,i._.arrows.endString,1));break;case"stroke-dasharray":k(i,g,a);break;case"fill":var N=r(g).match(t._ISURL);if(N){A=v("pattern");var L=v("image");A.id=t.createUUID(),v(A,{x:0,y:0,patternUnits:"userSpaceOnUse",height:1,width:1}),v(L,{x:0,y:0,"xlink:href":N[1]}),A.appendChild(L),function(e){t._preload(N[1],function(){var t=this.offsetWidth,r=this.offsetHeight;v(e,{width:t,height:r}),v(L,{width:t,height:r})})}(A),i.paper.defs.appendChild(A),v(l,{fill:"url(#"+A.id+")"}),i.pattern=A,i.pattern&&b(i);break}var z=t.getRGB(g);if(z.error){if(("circle"==i.type||"ellipse"==i.type||"r"!=r(g).charAt())&&x(i,g)){if("opacity"in u||"fill-opacity"in u){var P=t._g.doc.getElementById(l.getAttribute("fill").replace(/^url\(#|\)$/g,c));if(P){var F=P.getElementsByTagName("stop");v(F[F.length-1],{"stop-opacity":("opacity"in u?u.opacity:1)*("fill-opacity"in u?u["fill-opacity"]:1)})}}u.gradient=g,u.fill="none";break}}else delete a.gradient,delete u.gradient,!t.is(u.opacity,"undefined")&&t.is(a.opacity,"undefined")&&v(l,{opacity:u.opacity}),!t.is(u["fill-opacity"],"undefined")&&t.is(a["fill-opacity"],"undefined")&&v(l,{"fill-opacity":u["fill-opacity"]});z[e]("opacity")&&v(l,{"fill-opacity":z.opacity>1?z.opacity/100:z.opacity});case"stroke":z=t.getRGB(g),l.setAttribute(d,z.hex),"stroke"==d&&z[e]("opacity")&&v(l,{"stroke-opacity":z.opacity>1?z.opacity/100:z.opacity}),"stroke"==d&&i._.arrows&&("startString"in i._.arrows&&_(i,i._.arrows.startString),"endString"in i._.arrows&&_(i,i._.arrows.endString,1));break;case"gradient":("circle"==i.type||"ellipse"==i.type||"r"!=r(g).charAt())&&x(i,g);break;case"opacity":u.gradient&&!u[e]("stroke-opacity")&&v(l,{"stroke-opacity":g>1?g/100:g});case"fill-opacity":if(u.gradient){P=t._g.doc.getElementById(l.getAttribute("fill").replace(/^url\(#|\)$/g,c)),P&&(F=P.getElementsByTagName("stop"),v(F[F.length-1],{"stop-opacity":g}));break}default:"font-size"==d&&(g=n(g,10)+"px");var R=d.replace(/(\-.)/g,function(t){return t.substring(1).toUpperCase()});l.style[R]=g,i._.dirty=1,l.setAttribute(d,g)}}S(i,a),l.style.visibility=f},C=1.2,S=function(i,a){if("text"==i.type&&(a[e]("text")||a[e]("font")||a[e]("font-size")||a[e]("x")||a[e]("y"))){var s=i.attrs,o=i.node,l=o.firstChild?n(t._g.doc.defaultView.getComputedStyle(o.firstChild,c).getPropertyValue("font-size"),10):10;if(a[e]("text")){for(s.text=a.text;o.firstChild;)o.removeChild(o.firstChild);for(var h=r(a.text).split("\n"),u=[],f,p=0,d=h.length;p<d;p++)f=v("tspan"),p&&v(f,{dy:l*C,x:s.x}),f.appendChild(t._g.doc.createTextNode(h[p])),o.appendChild(f),u[p]=f}else for(u=o.getElementsByTagName("tspan"),p=0,d=u.length;p<d;p++)p?v(u[p],{dy:l*C,x:s.x}):v(u[0],{dy:0});v(o,{x:s.x,y:s.y}),i._.dirty=1;var g=i._getBBox(),x=s.y-(g.y+g.height/2);x&&t.is(x,"finite")&&v(u[0],{dy:x})}},A=function(t){return t.parentNode&&"a"===t.parentNode.tagName.toLowerCase()?t.parentNode:t},T=function(e,r){function i(){return("0000"+(Math.random()*Math.pow(36,5)<<0).toString(36)).slice(-5)}var n=0,a=0;this[0]=this.node=e,e.raphael=!0,this.id=i(),e.raphaelid=this.id,this.matrix=t.matrix(),this.realPath=null,this.paper=r,this.attrs=this.attrs||{},this._={transform:[],sx:1,sy:1,deg:0,dx:0,dy:0,dirty:1},!r.bottom&&(r.bottom=this),this.prev=r.top,r.top&&(r.top.next=this),r.top=this,this.next=null},E=t.el;T.prototype=E,E.constructor=T,t._engine.path=function(t,e){var r=v("path");e.canvas&&e.canvas.appendChild(r);var i=new T(r,e);return i.type="path",B(i,{fill:"none",stroke:"#000",path:t}),i},E.rotate=function(t,e,n){if(this.removed)return this;if(t=r(t).split(h),t.length-1&&(e=i(t[1]),n=i(t[2])),t=i(t[0]),null==n&&(e=n),null==e||null==n){var a=this.getBBox(1);e=a.x+a.width/2,n=a.y+a.height/2}return this.transform(this._.transform.concat([["r",t,e,n]])),this},E.scale=function(t,e,n,a){if(this.removed)return this;if(t=r(t).split(h),t.length-1&&(e=i(t[1]),n=i(t[2]),a=i(t[3])),t=i(t[0]),null==e&&(e=t),null==a&&(n=a),null==n||null==a)var s=this.getBBox(1);return n=null==n?s.x+s.width/2:n,a=null==a?s.y+s.height/2:a,this.transform(this._.transform.concat([["s",t,e,n,a]])),this},E.translate=function(t,e){return this.removed?this:(t=r(t).split(h),t.length-1&&(e=i(t[1])),t=i(t[0])||0,e=+e||0,this.transform(this._.transform.concat([["t",t,e]])),this)},E.transform=function(r){var i=this._;if(null==r)return i.transform;if(t._extractTransform(this,r),this.clip&&v(this.clip,{transform:this.matrix.invert()}),this.pattern&&b(this),this.node&&v(this.node,{transform:this.matrix}),1!=i.sx||1!=i.sy){var n=this.attrs[e]("stroke-width")?this.attrs["stroke-width"]:1;this.attr({"stroke-width":n})}return this},E.hide=function(){return this.removed||(this.node.style.display="none"),this},E.show=function(){return this.removed||(this.node.style.display=""),this},E.remove=function(){var e=A(this.node);if(!this.removed&&e.parentNode){var r=this.paper;r.__set__&&r.__set__.exclude(this),u.unbind("raphael.*.*."+this.id),this.gradient&&r.defs.removeChild(this.gradient),t._tear(this,r),e.parentNode.removeChild(e),this.removeData();for(var i in this)this[i]="function"==typeof this[i]?t._removedFactory(i):null;this.removed=!0}},E._getBBox=function(){if("none"==this.node.style.display){this.show();var t=!0}var e=!1,r;this.paper.canvas.parentElement?r=this.paper.canvas.parentElement.style:this.paper.canvas.parentNode&&(r=this.paper.canvas.parentNode.style),r&&"none"==r.display&&(e=!0,r.display="");var i={};try{i=this.node.getBBox()}catch(n){i={x:this.node.clientLeft,y:this.node.clientTop,width:this.node.clientWidth,height:this.node.clientHeight}}finally{i=i||{},e&&(r.display="none")}return t&&this.hide(),i},E.attr=function(r,i){if(this.removed)return this;if(null==r){var n={};for(var a in this.attrs)this.attrs[e](a)&&(n[a]=this.attrs[a]);return n.gradient&&"none"==n.fill&&(n.fill=n.gradient)&&delete n.gradient,n.transform=this._.transform,n}if(null==i&&t.is(r,"string")){if("fill"==r&&"none"==this.attrs.fill&&this.attrs.gradient)return this.attrs.gradient;if("transform"==r)return this._.transform;for(var s=r.split(h),o={},l=0,c=s.length;l<c;l++)r=s[l],r in this.attrs?o[r]=this.attrs[r]:t.is(this.paper.customAttributes[r],"function")?o[r]=this.paper.customAttributes[r].def:o[r]=t._availableAttrs[r];return c-1?o:o[s[0]]}if(null==i&&t.is(r,"array")){for(o={},l=0,c=r.length;l<c;l++)o[r[l]]=this.attr(r[l]);return o}if(null!=i){var f={};f[r]=i}else null!=r&&t.is(r,"object")&&(f=r);for(var p in f)u("raphael.attr."+p+"."+this.id,this,f[p]);for(p in this.paper.customAttributes)if(this.paper.customAttributes[e](p)&&f[e](p)&&t.is(this.paper.customAttributes[p],"function")){var d=this.paper.customAttributes[p].apply(this,[].concat(f[p]));this.attrs[p]=f[p];for(var g in d)d[e](g)&&(f[g]=d[g])}return B(this,f),this},E.toFront=function(){if(this.removed)return this;var e=A(this.node);e.parentNode.appendChild(e);var r=this.paper;return r.top!=this&&t._tofront(this,r),this},E.toBack=function(){if(this.removed)return this;var e=A(this.node),r=e.parentNode;r.insertBefore(e,r.firstChild),t._toback(this,this.paper);var i=this.paper;return this},E.insertAfter=function(e){if(this.removed||!e)return this;var r=A(this.node),i=A(e.node||e[e.length-1].node);return i.nextSibling?i.parentNode.insertBefore(r,i.nextSibling):i.parentNode.appendChild(r),t._insertafter(this,e,this.paper),this},E.insertBefore=function(e){if(this.removed||!e)return this;var r=A(this.node),i=A(e.node||e[0].node);return i.parentNode.insertBefore(r,i),t._insertbefore(this,e,this.paper),this},E.blur=function(e){var r=this;if(0!==+e){var i=v("filter"),n=v("feGaussianBlur");r.attrs.blur=e,i.id=t.createUUID(),v(n,{stdDeviation:+e||1.5}),i.appendChild(n),r.paper.defs.appendChild(i),r._blur=i,v(r.node,{filter:"url(#"+i.id+")"})}else r._blur&&(r._blur.parentNode.removeChild(r._blur),delete r._blur,delete r.attrs.blur),r.node.removeAttribute("filter");return r},t._engine.circle=function(t,e,r,i){var n=v("circle");t.canvas&&t.canvas.appendChild(n);var a=new T(n,t);return a.attrs={cx:e,cy:r,r:i,fill:"none",stroke:"#000"},a.type="circle",v(n,a.attrs),a},t._engine.rect=function(t,e,r,i,n,a){var s=v("rect");t.canvas&&t.canvas.appendChild(s);var o=new T(s,t);return o.attrs={x:e,y:r,width:i,height:n,rx:a||0,ry:a||0,fill:"none",stroke:"#000"},o.type="rect",v(s,o.attrs),o},t._engine.ellipse=function(t,e,r,i,n){var a=v("ellipse");t.canvas&&t.canvas.appendChild(a);var s=new T(a,t);return s.attrs={cx:e,cy:r,rx:i,ry:n,fill:"none",stroke:"#000"},s.type="ellipse",v(a,s.attrs),s},t._engine.image=function(t,e,r,i,n,a){var s=v("image");v(s,{x:r,y:i,width:n,height:a,preserveAspectRatio:"none"}),s.setAttributeNS(p,"href",e),t.canvas&&t.canvas.appendChild(s);var o=new T(s,t);return o.attrs={x:r,y:i,width:n,height:a,src:e},o.type="image",o},t._engine.text=function(e,r,i,n){var a=v("text");e.canvas&&e.canvas.appendChild(a);var s=new T(a,e);return s.attrs={x:r,y:i,"text-anchor":"middle",text:n,"font-family":t._availableAttrs["font-family"],"font-size":t._availableAttrs["font-size"],stroke:"none",fill:"#000"},s.type="text",B(s,s.attrs),s},t._engine.setSize=function(t,e){return this.width=t||this.width,this.height=e||this.height,this.canvas.setAttribute("width",this.width),this.canvas.setAttribute("height",this.height),this._viewBox&&this.setViewBox.apply(this,this._viewBox),this},t._engine.create=function(){var e=t._getContainer.apply(0,arguments),r=e&&e.container,i=e.x,n=e.y,a=e.width,s=e.height;if(!r)throw new Error("SVG container not found.");var o=v("svg"),l="overflow:hidden;",h;return i=i||0,n=n||0,a=a||512,s=s||342,v(o,{height:s,version:1.1,width:a,xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink"}),1==r?(o.style.cssText=l+"position:absolute;left:"+i+"px;top:"+n+"px",t._g.doc.body.appendChild(o),h=1):(o.style.cssText=l+"position:relative",r.firstChild?r.insertBefore(o,r.firstChild):r.appendChild(o)),r=new t._Paper,r.width=a,r.height=s,r.canvas=o,r.clear(),r._left=r._top=0,h&&(r.renderfix=function(){}),r.renderfix(),r},t._engine.setViewBox=function(t,e,r,i,n){u("raphael.setViewBox",this,this._viewBox,[t,e,r,i,n]);var a=this.getSize(),o=s(r/a.width,i/a.height),l=this.top,h=n?"xMidYMid meet":"xMinYMin",c,p;for(null==t?(this._vbSize&&(o=1),delete this._vbSize,c="0 0 "+this.width+f+this.height):(this._vbSize=o,c=t+f+e+f+r+f+i),v(this.canvas,{viewBox:c,preserveAspectRatio:h});o&&l;)p="stroke-width"in l.attrs?l.attrs["stroke-width"]:1,l.attr({"stroke-width":p}),l._.dirty=1,l._.dirtyT=1,l=l.prev;return this._viewBox=[t,e,r,i,!!n],this},t.prototype.renderfix=function(){var t=this.canvas,e=t.style,r;try{r=t.getScreenCTM()||t.createSVGMatrix()}catch(i){r=t.createSVGMatrix()}var n=-r.e%1,a=-r.f%1;(n||a)&&(n&&(this._left=(this._left+n)%1,e.left=this._left+"px"),a&&(this._top=(this._top+a)%1,e.top=this._top+"px"))},t.prototype.clear=function(){t.eve("raphael.clear",this);for(var e=this.canvas;e.firstChild;)e.removeChild(e.firstChild);this.bottom=this.top=null,(this.desc=v("desc")).appendChild(t._g.doc.createTextNode("Created with Raphaël "+t.version)),e.appendChild(this.desc),e.appendChild(this.defs=v("defs"))},t.prototype.remove=function(){u("raphael.remove",this),this.canvas.parentNode&&this.canvas.parentNode.removeChild(this.canvas);for(var e in this)this[e]="function"==typeof this[e]?t._removedFactory(e):null};var M=t.st;for(var N in E)E[e](N)&&!M[e](N)&&(M[N]=function(t){return function(){var e=arguments;return this.forEach(function(r){r[t].apply(r,e)})}}(N))}}.apply(e,i),!(void 0!==n&&(t.exports=n))},function(t,e,r){var i,n;i=[r(1)],n=function(t){if(!t||t.vml){var e="hasOwnProperty",r=String,i=parseFloat,n=Math,a=n.round,s=n.max,o=n.min,l=n.abs,h="fill",u=/[, ]+/,c=t.eve,f=" progid:DXImageTransform.Microsoft",p=" ",d="",g={M:"m",L:"l",C:"c",Z:"x",m:"t",l:"r",c:"v",z:"x"},v=/([clmz]),?([^clmz]*)/gi,x=/ progid:\S+Blur\([^\)]+\)/g,y=/-?[^,\s-]+/g,m="position:absolute;left:0;top:0;width:1px;height:1px;behavior:url(#default#VML)",b=21600,_={path:1,rect:1,image:1},w={circle:1,ellipse:1},k=function(e){var i=/[ahqstv]/gi,n=t._pathToAbsolute;if(r(e).match(i)&&(n=t._path2curve),i=/[clmz]/g,n==t._pathToAbsolute&&!r(e).match(i)){var s=r(e).replace(v,function(t,e,r){var i=[],n="m"==e.toLowerCase(),s=g[e];return r.replace(y,function(t){n&&2==i.length&&(s+=i+g["m"==e?"l":"L"],i=[]),i.push(a(t*b))}),s+i});return s}var o=n(e),l,h;s=[];for(var u=0,c=o.length;u<c;u++){l=o[u],h=o[u][0].toLowerCase(),"z"==h&&(h="x");for(var f=1,x=l.length;f<x;f++)h+=a(l[f]*b)+(f!=x-1?",":d);s.push(h)}return s.join(p)},B=function(e,r,i){var n=t.matrix();return n.rotate(-e,.5,.5),{dx:n.x(r,i),dy:n.y(r,i)}},C=function(t,e,r,i,n,a){var s=t._,o=t.matrix,u=s.fillpos,c=t.node,f=c.style,d=1,g="",v,x=b/e,y=b/r;if(f.visibility="hidden",e&&r){if(c.coordsize=l(x)+p+l(y),f.rotation=a*(e*r<0?-1:1),a){var m=B(a,i,n);i=m.dx,n=m.dy}if(e<0&&(g+="x"),r<0&&(g+=" y")&&(d=-1),f.flip=g,c.coordorigin=i*-x+p+n*-y,u||s.fillsize){var _=c.getElementsByTagName(h);_=_&&_[0],c.removeChild(_),u&&(m=B(a,o.x(u[0],u[1]),o.y(u[0],u[1])),_.position=m.dx*d+p+m.dy*d),s.fillsize&&(_.size=s.fillsize[0]*l(e)+p+s.fillsize[1]*l(r)),c.appendChild(_)}f.visibility="visible"}};t.toString=function(){return"Your browser doesn’t support SVG. Falling down to VML.\nYou are running Raphaël "+this.version};var S=function(t,e,i){for(var n=r(e).toLowerCase().split("-"),a=i?"end":"start",s=n.length,o="classic",l="medium",h="medium";s--;)switch(n[s]){case"block":case"classic":case"oval":case"diamond":case"open":case"none":o=n[s];break;case"wide":case"narrow":h=n[s];break;case"long":case"short":l=n[s]}var u=t.node.getElementsByTagName("stroke")[0];u[a+"arrow"]=o,u[a+"arrowlength"]=l,u[a+"arrowwidth"]=h},A=function(n,l){n.attrs=n.attrs||{};var c=n.node,f=n.attrs,g=c.style,v,x=_[n.type]&&(l.x!=f.x||l.y!=f.y||l.width!=f.width||l.height!=f.height||l.cx!=f.cx||l.cy!=f.cy||l.rx!=f.rx||l.ry!=f.ry||l.r!=f.r),y=w[n.type]&&(f.cx!=l.cx||f.cy!=l.cy||f.r!=l.r||f.rx!=l.rx||f.ry!=l.ry),m=n;for(var B in l)l[e](B)&&(f[B]=l[B]);if(x&&(f.path=t._getPath[n.type](n),n._.dirty=1),l.href&&(c.href=l.href),l.title&&(c.title=l.title),l.target&&(c.target=l.target),l.cursor&&(g.cursor=l.cursor),"blur"in l&&n.blur(l.blur),(l.path&&"path"==n.type||x)&&(c.path=k(~r(f.path).toLowerCase().indexOf("r")?t._pathToAbsolute(f.path):f.path),n._.dirty=1,"image"==n.type&&(n._.fillpos=[f.x,f.y],n._.fillsize=[f.width,f.height],C(n,1,1,0,0,0))),"transform"in l&&n.transform(l.transform),y){var A=+f.cx,E=+f.cy,M=+f.rx||+f.r||0,L=+f.ry||+f.r||0;c.path=t.format("ar{0},{1},{2},{3},{4},{1},{4},{1}x",a((A-M)*b),a((E-L)*b),a((A+M)*b),a((E+L)*b),a(A*b)),n._.dirty=1}if("clip-rect"in l){var z=r(l["clip-rect"]).split(u);if(4==z.length){z[2]=+z[2]+ +z[0],z[3]=+z[3]+ +z[1];var P=c.clipRect||t._g.doc.createElement("div"),F=P.style;F.clip=t.format("rect({1}px {2}px {3}px {0}px)",z),c.clipRect||(F.position="absolute",F.top=0,F.left=0,F.width=n.paper.width+"px",F.height=n.paper.height+"px",c.parentNode.insertBefore(P,c),P.appendChild(c),c.clipRect=P)}l["clip-rect"]||c.clipRect&&(c.clipRect.style.clip="auto")}if(n.textpath){var R=n.textpath.style;l.font&&(R.font=l.font),l["font-family"]&&(R.fontFamily='"'+l["font-family"].split(",")[0].replace(/^['"]+|['"]+$/g,d)+'"'),l["font-size"]&&(R.fontSize=l["font-size"]),l["font-weight"]&&(R.fontWeight=l["font-weight"]),l["font-style"]&&(R.fontStyle=l["font-style"])}if("arrow-start"in l&&S(m,l["arrow-start"]),"arrow-end"in l&&S(m,l["arrow-end"],1),null!=l.opacity||null!=l.fill||null!=l.src||null!=l.stroke||null!=l["stroke-width"]||null!=l["stroke-opacity"]||null!=l["fill-opacity"]||null!=l["stroke-dasharray"]||null!=l["stroke-miterlimit"]||null!=l["stroke-linejoin"]||null!=l["stroke-linecap"]){var j=c.getElementsByTagName(h),I=!1;if(j=j&&j[0],!j&&(I=j=N(h)),"image"==n.type&&l.src&&(j.src=l.src),l.fill&&(j.on=!0),null!=j.on&&"none"!=l.fill&&null!==l.fill||(j.on=!1),j.on&&l.fill){var q=r(l.fill).match(t._ISURL);if(q){j.parentNode==c&&c.removeChild(j),j.rotate=!0,j.src=q[1],j.type="tile";var D=n.getBBox(1);j.position=D.x+p+D.y,n._.fillpos=[D.x,D.y],t._preload(q[1],function(){n._.fillsize=[this.offsetWidth,this.offsetHeight]})}else j.color=t.getRGB(l.fill).hex,j.src=d,j.type="solid",t.getRGB(l.fill).error&&(m.type in{circle:1,ellipse:1}||"r"!=r(l.fill).charAt())&&T(m,l.fill,j)&&(f.fill="none",f.gradient=l.fill,j.rotate=!1)}if("fill-opacity"in l||"opacity"in l){var V=((+f["fill-opacity"]+1||2)-1)*((+f.opacity+1||2)-1)*((+t.getRGB(l.fill).o+1||2)-1);V=o(s(V,0),1),j.opacity=V,j.src&&(j.color="none")}c.appendChild(j);var O=c.getElementsByTagName("stroke")&&c.getElementsByTagName("stroke")[0],Y=!1;!O&&(Y=O=N("stroke")),(l.stroke&&"none"!=l.stroke||l["stroke-width"]||null!=l["stroke-opacity"]||l["stroke-dasharray"]||l["stroke-miterlimit"]||l["stroke-linejoin"]||l["stroke-linecap"])&&(O.on=!0),("none"==l.stroke||null===l.stroke||null==O.on||0==l.stroke||0==l["stroke-width"])&&(O.on=!1);var W=t.getRGB(l.stroke);O.on&&l.stroke&&(O.color=W.hex),V=((+f["stroke-opacity"]+1||2)-1)*((+f.opacity+1||2)-1)*((+W.o+1||2)-1);var G=.75*(i(l["stroke-width"])||1);if(V=o(s(V,0),1),null==l["stroke-width"]&&(G=f["stroke-width"]),l["stroke-width"]&&(O.weight=G),G&&G<1&&(V*=G)&&(O.weight=1),O.opacity=V,l["stroke-linejoin"]&&(O.joinstyle=l["stroke-linejoin"]||"miter"),O.miterlimit=l["stroke-miterlimit"]||8,l["stroke-linecap"]&&(O.endcap="butt"==l["stroke-linecap"]?"flat":"square"==l["stroke-linecap"]?"square":"round"),"stroke-dasharray"in l){var H={"-":"shortdash",".":"shortdot","-.":"shortdashdot","-..":"shortdashdotdot",". ":"dot","- ":"dash","--":"longdash","- .":"dashdot","--.":"longdashdot","--..":"longdashdotdot"};O.dashstyle=H[e](l["stroke-dasharray"])?H[l["stroke-dasharray"]]:d}Y&&c.appendChild(O)}if("text"==m.type){m.paper.canvas.style.display=d;var X=m.paper.span,U=100,$=f.font&&f.font.match(/\d+(?:\.\d*)?(?=px)/);g=X.style,f.font&&(g.font=f.font),f["font-family"]&&(g.fontFamily=f["font-family"]),f["font-weight"]&&(g.fontWeight=f["font-weight"]),f["font-style"]&&(g.fontStyle=f["font-style"]),$=i(f["font-size"]||$&&$[0])||10,g.fontSize=$*U+"px",m.textpath.string&&(X.innerHTML=r(m.textpath.string).replace(/</g,"&#60;").replace(/&/g,"&#38;").replace(/\n/g,"<br>"));var Z=X.getBoundingClientRect();m.W=f.w=(Z.right-Z.left)/U,m.H=f.h=(Z.bottom-Z.top)/U,m.X=f.x,m.Y=f.y+m.H/2,("x"in l||"y"in l)&&(m.path.v=t.format("m{0},{1}l{2},{1}",a(f.x*b),a(f.y*b),a(f.x*b)+1));for(var Q=["x","y","text","font","font-family","font-weight","font-style","font-size"],J=0,K=Q.length;J<K;J++)if(Q[J]in l){m._.dirty=1;break}switch(f["text-anchor"]){case"start":m.textpath.style["v-text-align"]="left",m.bbx=m.W/2;break;case"end":m.textpath.style["v-text-align"]="right",m.bbx=-m.W/2;break;default:m.textpath.style["v-text-align"]="center",m.bbx=0}m.textpath.style["v-text-kern"]=!0}},T=function(e,a,s){e.attrs=e.attrs||{};var o=e.attrs,l=Math.pow,h,u,c="linear",f=".5 .5";if(e.attrs.gradient=a,a=r(a).replace(t._radial_gradient,function(t,e,r){return c="radial",e&&r&&(e=i(e),r=i(r),l(e-.5,2)+l(r-.5,2)>.25&&(r=n.sqrt(.25-l(e-.5,2))*(2*(r>.5)-1)+.5),f=e+p+r),d}),a=a.split(/\s*\-\s*/),"linear"==c){var g=a.shift();if(g=-i(g),isNaN(g))return null}var v=t._parseDots(a);if(!v)return null;if(e=e.shape||e.node,v.length){e.removeChild(s),s.on=!0,s.method="none",s.color=v[0].color,s.color2=v[v.length-1].color;for(var x=[],y=0,m=v.length;y<m;y++)v[y].offset&&x.push(v[y].offset+p+v[y].color);s.colors=x.length?x.join():"0% "+s.color,"radial"==c?(s.type="gradientTitle",s.focus="100%",s.focussize="0 0",s.focusposition=f,s.angle=0):(s.type="gradient",s.angle=(270-g)%360),e.appendChild(s)}return 1},E=function(e,r){this[0]=this.node=e,e.raphael=!0,this.id=t._oid++,e.raphaelid=this.id,this.X=0,this.Y=0,this.attrs={},this.paper=r,this.matrix=t.matrix(),this._={transform:[],sx:1,sy:1,dx:0,dy:0,deg:0,dirty:1,dirtyT:1},!r.bottom&&(r.bottom=this),this.prev=r.top,r.top&&(r.top.next=this),r.top=this,this.next=null},M=t.el;E.prototype=M,M.constructor=E,M.transform=function(e){if(null==e)return this._.transform;var i=this.paper._viewBoxShift,n=i?"s"+[i.scale,i.scale]+"-1-1t"+[i.dx,i.dy]:d,a;i&&(a=e=r(e).replace(/\.{3}|\u2026/g,this._.transform||d)),t._extractTransform(this,n+e);var s=this.matrix.clone(),o=this.skew,l=this.node,h,u=~r(this.attrs.fill).indexOf("-"),c=!r(this.attrs.fill).indexOf("url(");if(s.translate(1,1),c||u||"image"==this.type)if(o.matrix="1 0 0 1",o.offset="0 0",h=s.split(),u&&h.noRotation||!h.isSimple){l.style.filter=s.toFilter();var f=this.getBBox(),g=this.getBBox(1),v=f.x-g.x,x=f.y-g.y;l.coordorigin=v*-b+p+x*-b,C(this,1,1,v,x,0)}else l.style.filter=d,C(this,h.scalex,h.scaley,h.dx,h.dy,h.rotate);else l.style.filter=d,o.matrix=r(s),o.offset=s.offset();return null!==a&&(this._.transform=a,t._extractTransform(this,a)),this},M.rotate=function(t,e,n){if(this.removed)return this;if(null!=t){if(t=r(t).split(u),t.length-1&&(e=i(t[1]),n=i(t[2])),t=i(t[0]),null==n&&(e=n),null==e||null==n){var a=this.getBBox(1);e=a.x+a.width/2,n=a.y+a.height/2}return this._.dirtyT=1,this.transform(this._.transform.concat([["r",t,e,n]])),this}},M.translate=function(t,e){return this.removed?this:(t=r(t).split(u),t.length-1&&(e=i(t[1])),t=i(t[0])||0,e=+e||0,this._.bbox&&(this._.bbox.x+=t,this._.bbox.y+=e),this.transform(this._.transform.concat([["t",t,e]])),this)},M.scale=function(t,e,n,a){if(this.removed)return this;if(t=r(t).split(u),t.length-1&&(e=i(t[1]),n=i(t[2]),a=i(t[3]),isNaN(n)&&(n=null),isNaN(a)&&(a=null)),t=i(t[0]),null==e&&(e=t),null==a&&(n=a),null==n||null==a)var s=this.getBBox(1);return n=null==n?s.x+s.width/2:n,a=null==a?s.y+s.height/2:a,this.transform(this._.transform.concat([["s",t,e,n,a]])),this._.dirtyT=1,this},M.hide=function(){return!this.removed&&(this.node.style.display="none"),this},M.show=function(){return!this.removed&&(this.node.style.display=d),this},M.auxGetBBox=t.el.getBBox,M.getBBox=function(){var t=this.auxGetBBox();if(this.paper&&this.paper._viewBoxShift){var e={},r=1/this.paper._viewBoxShift.scale;return e.x=t.x-this.paper._viewBoxShift.dx,e.x*=r,e.y=t.y-this.paper._viewBoxShift.dy,e.y*=r,e.width=t.width*r,e.height=t.height*r,e.x2=e.x+e.width,e.y2=e.y+e.height,e}return t},M._getBBox=function(){return this.removed?{}:{x:this.X+(this.bbx||0)-this.W/2,y:this.Y-this.H,width:this.W,height:this.H}},M.remove=function(){if(!this.removed&&this.node.parentNode){this.paper.__set__&&this.paper.__set__.exclude(this),t.eve.unbind("raphael.*.*."+this.id),t._tear(this,this.paper),this.node.parentNode.removeChild(this.node),this.shape&&this.shape.parentNode.removeChild(this.shape);for(var e in this)this[e]="function"==typeof this[e]?t._removedFactory(e):null;this.removed=!0}},M.attr=function(r,i){if(this.removed)return this;if(null==r){var n={};for(var a in this.attrs)this.attrs[e](a)&&(n[a]=this.attrs[a]);return n.gradient&&"none"==n.fill&&(n.fill=n.gradient)&&delete n.gradient,n.transform=this._.transform,n}if(null==i&&t.is(r,"string")){if(r==h&&"none"==this.attrs.fill&&this.attrs.gradient)return this.attrs.gradient;for(var s=r.split(u),o={},l=0,f=s.length;l<f;l++)r=s[l],r in this.attrs?o[r]=this.attrs[r]:t.is(this.paper.customAttributes[r],"function")?o[r]=this.paper.customAttributes[r].def:o[r]=t._availableAttrs[r];return f-1?o:o[s[0]]}if(this.attrs&&null==i&&t.is(r,"array")){for(o={},l=0,f=r.length;l<f;l++)o[r[l]]=this.attr(r[l]);return o}var p;null!=i&&(p={},p[r]=i),null==i&&t.is(r,"object")&&(p=r);for(var d in p)c("raphael.attr."+d+"."+this.id,this,p[d]);if(p){for(d in this.paper.customAttributes)if(this.paper.customAttributes[e](d)&&p[e](d)&&t.is(this.paper.customAttributes[d],"function")){var g=this.paper.customAttributes[d].apply(this,[].concat(p[d]));this.attrs[d]=p[d];for(var v in g)g[e](v)&&(p[v]=g[v])}p.text&&"text"==this.type&&(this.textpath.string=p.text),A(this,p)}return this},M.toFront=function(){return!this.removed&&this.node.parentNode.appendChild(this.node),this.paper&&this.paper.top!=this&&t._tofront(this,this.paper),this},M.toBack=function(){return this.removed?this:(this.node.parentNode.firstChild!=this.node&&(this.node.parentNode.insertBefore(this.node,this.node.parentNode.firstChild),t._toback(this,this.paper)),this)},M.insertAfter=function(e){return this.removed?this:(e.constructor==t.st.constructor&&(e=e[e.length-1]),e.node.nextSibling?e.node.parentNode.insertBefore(this.node,e.node.nextSibling):e.node.parentNode.appendChild(this.node),t._insertafter(this,e,this.paper),this)},M.insertBefore=function(e){return this.removed?this:(e.constructor==t.st.constructor&&(e=e[0]),e.node.parentNode.insertBefore(this.node,e.node),t._insertbefore(this,e,this.paper),this)},M.blur=function(e){var r=this.node.runtimeStyle,i=r.filter;return i=i.replace(x,d),0!==+e?(this.attrs.blur=e,r.filter=i+p+f+".Blur(pixelradius="+(+e||1.5)+")",r.margin=t.format("-{0}px 0 0 -{0}px",a(+e||1.5))):(r.filter=i,r.margin=0,delete this.attrs.blur),this},t._engine.path=function(t,e){var r=N("shape");r.style.cssText=m,r.coordsize=b+p+b,r.coordorigin=e.coordorigin;var i=new E(r,e),n={fill:"none",stroke:"#000"};t&&(n.path=t),i.type="path",i.path=[],i.Path=d,A(i,n),e.canvas&&e.canvas.appendChild(r);var a=N("skew");return a.on=!0,r.appendChild(a),i.skew=a,i.transform(d),i},t._engine.rect=function(e,r,i,n,a,s){var o=t._rectPath(r,i,n,a,s),l=e.path(o),h=l.attrs;return l.X=h.x=r,l.Y=h.y=i,l.W=h.width=n,l.H=h.height=a,h.r=s,h.path=o,l.type="rect",l},t._engine.ellipse=function(t,e,r,i,n){var a=t.path(),s=a.attrs;return a.X=e-i,a.Y=r-n,a.W=2*i,a.H=2*n,a.type="ellipse",A(a,{cx:e,cy:r,rx:i,ry:n}),a},t._engine.circle=function(t,e,r,i){var n=t.path(),a=n.attrs;return n.X=e-i,n.Y=r-i,n.W=n.H=2*i,n.type="circle",A(n,{cx:e,cy:r,r:i}),n},t._engine.image=function(e,r,i,n,a,s){var o=t._rectPath(i,n,a,s),l=e.path(o).attr({stroke:"none"}),u=l.attrs,c=l.node,f=c.getElementsByTagName(h)[0];return u.src=r,l.X=u.x=i,l.Y=u.y=n,l.W=u.width=a,l.H=u.height=s,u.path=o,l.type="image",f.parentNode==c&&c.removeChild(f),f.rotate=!0,f.src=r,f.type="tile",l._.fillpos=[i,n],l._.fillsize=[a,s],c.appendChild(f),C(l,1,1,0,0,0),l},t._engine.text=function(e,i,n,s){var o=N("shape"),l=N("path"),h=N("textpath");i=i||0,n=n||0,s=s||"",l.v=t.format("m{0},{1}l{2},{1}",a(i*b),a(n*b),a(i*b)+1),l.textpathok=!0,h.string=r(s),h.on=!0,o.style.cssText=m,o.coordsize=b+p+b,o.coordorigin="0 0";var u=new E(o,e),c={fill:"#000",stroke:"none",font:t._availableAttrs.font,text:s};u.shape=o,u.path=l,u.textpath=h,u.type="text",u.attrs.text=r(s),u.attrs.x=i,u.attrs.y=n,u.attrs.w=1,u.attrs.h=1,A(u,c),o.appendChild(h),o.appendChild(l),e.canvas.appendChild(o);var f=N("skew");return f.on=!0,o.appendChild(f),u.skew=f,u.transform(d),u},t._engine.setSize=function(e,r){var i=this.canvas.style;return this.width=e,this.height=r,e==+e&&(e+="px"),r==+r&&(r+="px"),i.width=e,i.height=r,i.clip="rect(0 "+e+" "+r+" 0)",this._viewBox&&t._engine.setViewBox.apply(this,this._viewBox),this},t._engine.setViewBox=function(e,r,i,n,a){t.eve("raphael.setViewBox",this,this._viewBox,[e,r,i,n,a]);var s=this.getSize(),o=s.width,l=s.height,h,u;return a&&(h=l/n,u=o/i,i*h<o&&(e-=(o-i*h)/2/h),n*u<l&&(r-=(l-n*u)/2/u)),this._viewBox=[e,r,i,n,!!a],this._viewBoxShift={dx:-e,dy:-r,scale:s},this.forEach(function(t){t.transform("...")}),this};var N;t._engine.initWin=function(t){var e=t.document;e.styleSheets.length<31?e.createStyleSheet().addRule(".rvml","behavior:url(#default#VML)"):e.styleSheets[0].addRule(".rvml","behavior:url(#default#VML)");try{!e.namespaces.rvml&&e.namespaces.add("rvml","urn:schemas-microsoft-com:vml"),N=function(t){return e.createElement("<rvml:"+t+' class="rvml">')}}catch(r){N=function(t){return e.createElement("<"+t+' xmlns="urn:schemas-microsoft.com:vml" class="rvml">')}}},t._engine.initWin(t._g.win),t._engine.create=function(){var e=t._getContainer.apply(0,arguments),r=e.container,i=e.height,n,a=e.width,s=e.x,o=e.y;if(!r)throw new Error("VML container not found.");var l=new t._Paper,h=l.canvas=t._g.doc.createElement("div"),u=h.style;return s=s||0,o=o||0,a=a||512,i=i||342,l.width=a,l.height=i,a==+a&&(a+="px"),i==+i&&(i+="px"),l.coordsize=1e3*b+p+1e3*b,l.coordorigin="0 0",l.span=t._g.doc.createElement("span"),l.span.style.cssText="position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;",h.appendChild(l.span),u.cssText=t.format("top:0;left:0;width:{0};height:{1};display:inline-block;position:relative;clip:rect(0 {0} {1} 0);overflow:hidden",a,i),1==r?(t._g.doc.body.appendChild(h),u.left=s+"px",u.top=o+"px",u.position="absolute"):r.firstChild?r.insertBefore(h,r.firstChild):r.appendChild(h),l.renderfix=function(){},l},t.prototype.clear=function(){t.eve("raphael.clear",this),this.canvas.innerHTML=d,this.span=t._g.doc.createElement("span"),this.span.style.cssText="position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;",this.canvas.appendChild(this.span),this.bottom=this.top=null},t.prototype.remove=function(){t.eve("raphael.remove",this),this.canvas.parentNode.removeChild(this.canvas);for(var e in this)this[e]="function"==typeof this[e]?t._removedFactory(e):null;return!0};var L=t.st;for(var z in M)M[e](z)&&!L[e](z)&&(L[z]=function(t){return function(){var e=arguments;return this.forEach(function(r){r[t].apply(r,e)})}}(z))}}.apply(e,i),!(void 0!==n&&(t.exports=n))}])});
},{}],19:[function(require,module,exports){
'use strict';

var ua = typeof navigator !== 'undefined' ? navigator.userAgent.toLowerCase() : '';
var firefox = ua.indexOf('firefox') !== -1;
var safari = ua.indexOf('safari') !== -1 && ua.indexOf('chrom') === -1;

function wheel(e, lastValue) {
  var value, type, timeout;

  if (e.type === 'wheel') {
    value = e.deltaY;
    // Firefox doubles the values on retina.
    if (firefox && e.deltaMode === window.WheelEvent.DOM_DELTA_PIXEL) value /= 1;
    if (e.deltaMode === window.WheelEvent.DOM_DELTA_LINE) value *= 40;
  } else if (e.type === 'mousewheel') {
    value = -e.wheelDeltaY;
    if (safari) value = value / 3;
  }

  var now = (window.performance || Date).now();
  var timeDelta = now - 0;

  if (value !== 0 && (value % 4.000244140625) === 0) {
    // This is definitely a mouse wheel event.
    type = 'wheel';
    // Normalize this value to match trackpad.
    value = Math.floor(value / 4);

  } else if (value !== 0 && Math.abs(value) < 4) {
    // This one is definitely a trackpad event because it is so small.
    type = 'trackpad';

  } else if (timeDelta > 400) {
    // This is likely a new scroll action.
    type = null;
    lastValue = value;
  } else if (!type) {
    // This is a repeating event, but we don't know the type of event just yet.
    // If the delta per time is small, we assume it's a fast trackpad;
    // otherwise we switch into wheel mode.
    type = (Math.abs(timeDelta * value) < 200) ? 'trackpad' : 'wheel';

    // Make sure our delayed event isn't fired again, because we accumulate
    // the previous event (which was less than 40ms ago) into this event.
    if (timeout) {
        clearTimeout(timeout);
        timeout = null;
        value += lastValue;
    }
  }

  // Slow down zoom if shift key is held for more precise zooming
  if (e.shiftKey && value) value = value / 4;

  return -value;
}

module.exports = wheel;

},{}]},{},[1]);
