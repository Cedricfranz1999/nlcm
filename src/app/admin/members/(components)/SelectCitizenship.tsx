import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

const SelectCitizenship = ({ field }: { field: any }) => {
  return (
    <Select value={field.value} onValueChange={field.onChange}>
      <SelectTrigger className="w-[150px]">
        <SelectValue placeholder={"Filipino"} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Nationality</SelectLabel>
          <SelectItem value="afghan">Afghan</SelectItem>
          <SelectItem value="albanian">Albanian</SelectItem>
          <SelectItem value="algerian">Algerian</SelectItem>
          <SelectItem value="american">American</SelectItem>
          <SelectItem value="andorran">Andorran</SelectItem>
          <SelectItem value="angolan">Angolan</SelectItem>
          <SelectItem value="argentinian">Argentinian</SelectItem>
          <SelectItem value="armenian">Armenian</SelectItem>
          <SelectItem value="australian">Australian</SelectItem>
          <SelectItem value="austrian">Austrian</SelectItem>
          <SelectItem value="azerbaijani">Azerbaijani</SelectItem>
          <SelectItem value="bahamian">Bahamian</SelectItem>
          <SelectItem value="bahraini">Bahraini</SelectItem>
          <SelectItem value="bangladeshi">Bangladeshi</SelectItem>
          <SelectItem value="barbadian">Barbadian</SelectItem>
          <SelectItem value="belarusian">Belarusian</SelectItem>
          <SelectItem value="belgian">Belgian</SelectItem>
          <SelectItem value="belizean">Belizean</SelectItem>
          <SelectItem value="beninese">Beninese</SelectItem>
          <SelectItem value="bhutanese">Bhutanese</SelectItem>
          <SelectItem value="bolivian">Bolivian</SelectItem>
          <SelectItem value="bosnian">Bosnian</SelectItem>
          <SelectItem value="botswanan">Botswanan</SelectItem>
          <SelectItem value="brazilian">Brazilian</SelectItem>
          <SelectItem value="british">British</SelectItem>
          <SelectItem value="bruneian">Bruneian</SelectItem>
          <SelectItem value="bulgarian">Bulgarian</SelectItem>
          <SelectItem value="burkinabe">Burkinabe</SelectItem>
          <SelectItem value="burmese">Burmese</SelectItem>
          <SelectItem value="burundian">Burundian</SelectItem>
          <SelectItem value="cambodian">Cambodian</SelectItem>
          <SelectItem value="cameroonian">Cameroonian</SelectItem>
          <SelectItem value="canadian">Canadian</SelectItem>
          <SelectItem value="cape_verdean">Cape Verdean</SelectItem>
          <SelectItem value="central_african">Central African</SelectItem>
          <SelectItem value="chadian">Chadian</SelectItem>
          <SelectItem value="chilean">Chilean</SelectItem>
          <SelectItem value="chinese">Chinese</SelectItem>
          <SelectItem value="colombian">Colombian</SelectItem>
          <SelectItem value="comoran">Comoran</SelectItem>
          <SelectItem value="congolese">Congolese</SelectItem>
          <SelectItem value="costa_rican">Costa Rican</SelectItem>
          <SelectItem value="croatian">Croatian</SelectItem>
          <SelectItem value="cuban">Cuban</SelectItem>
          <SelectItem value="cypriot">Cypriot</SelectItem>
          <SelectItem value="czech">Czech</SelectItem>
          <SelectItem value="danish">Danish</SelectItem>
          <SelectItem value="djiboutian">Djiboutian</SelectItem>
          <SelectItem value="dominican">Dominican</SelectItem>
          <SelectItem value="dutch">Dutch</SelectItem>
          <SelectItem value="east_timorese">East Timorese</SelectItem>
          <SelectItem value="ecuadorean">Ecuadorean</SelectItem>
          <SelectItem value="egyptian">Egyptian</SelectItem>
          <SelectItem value="emirati">Emirati</SelectItem>
          <SelectItem value="equatorial_guinean">Equatorial Guinean</SelectItem>
          <SelectItem value="eritrean">Eritrean</SelectItem>
          <SelectItem value="estonian">Estonian</SelectItem>
          <SelectItem value="ethiopian">Ethiopian</SelectItem>
          <SelectItem value="fijian">Fijian</SelectItem>
          <SelectItem value="filipino">Filipino</SelectItem>
          <SelectItem value="finnish">Finnish</SelectItem>
          <SelectItem value="french">French</SelectItem>
          <SelectItem value="gabonese">Gabonese</SelectItem>
          <SelectItem value="gambian">Gambian</SelectItem>
          <SelectItem value="georgian">Georgian</SelectItem>
          <SelectItem value="german">German</SelectItem>
          <SelectItem value="ghanaian">Ghanaian</SelectItem>
          <SelectItem value="greek">Greek</SelectItem>
          <SelectItem value="grenadian">Grenadian</SelectItem>
          <SelectItem value="guatemalan">Guatemalan</SelectItem>
          <SelectItem value="guinea_bissauan">Guinea-Bissauan</SelectItem>
          <SelectItem value="guinean">Guinean</SelectItem>
          <SelectItem value="guyanese">Guyanese</SelectItem>
          <SelectItem value="haitian">Haitian</SelectItem>
          <SelectItem value="honduran">Honduran</SelectItem>
          <SelectItem value="hungarian">Hungarian</SelectItem>
          <SelectItem value="icelandic">Icelandic</SelectItem>
          <SelectItem value="indian">Indian</SelectItem>
          <SelectItem value="indonesian">Indonesian</SelectItem>
          <SelectItem value="iranian">Iranian</SelectItem>
          <SelectItem value="iraqi">Iraqi</SelectItem>
          <SelectItem value="irish">Irish</SelectItem>
          <SelectItem value="israeli">Israeli</SelectItem>
          <SelectItem value="italian">Italian</SelectItem>
          <SelectItem value="ivorian">Ivorian</SelectItem>
          <SelectItem value="jamaican">Jamaican</SelectItem>
          <SelectItem value="japanese">Japanese</SelectItem>
          <SelectItem value="jordanian">Jordanian</SelectItem>
          <SelectItem value="kazakh">Kazakh</SelectItem>
          <SelectItem value="kenyan">Kenyan</SelectItem>
          <SelectItem value="kittitian">Kittitian</SelectItem>
          <SelectItem value="kyrgyz">Kyrgyz</SelectItem>
          <SelectItem value="lao">Lao</SelectItem>
          <SelectItem value="latvian">Latvian</SelectItem>
          <SelectItem value="lebanese">Lebanese</SelectItem>
          <SelectItem value="liberian">Liberian</SelectItem>
          <SelectItem value="libyan">Libyan</SelectItem>
          <SelectItem value="liechtenstein">Liechtenstein</SelectItem>
          <SelectItem value="lithuanian">Lithuanian</SelectItem>
          <SelectItem value="luxembourger">Luxembourger</SelectItem>
          <SelectItem value="macedonian">Macedonian</SelectItem>
          <SelectItem value="malagasy">Malagasy</SelectItem>
          <SelectItem value="malawian">Malawian</SelectItem>
          <SelectItem value="malaysian">Malaysian</SelectItem>
          <SelectItem value="maldivian">Maldivian</SelectItem>
          <SelectItem value="malian">Malian</SelectItem>
          <SelectItem value="maltese">Maltese</SelectItem>
          <SelectItem value="marshallese">Marshallese</SelectItem>
          <SelectItem value="mauritanian">Mauritanian</SelectItem>
          <SelectItem value="mauritian">Mauritian</SelectItem>
          <SelectItem value="mexican">Mexican</SelectItem>
          <SelectItem value="micronesian">Micronesian</SelectItem>
          <SelectItem value="moldovan">Moldovan</SelectItem>
          <SelectItem value="monacan">Monacan</SelectItem>
          <SelectItem value="mongolian">Mongolian</SelectItem>
          <SelectItem value="moroccan">Moroccan</SelectItem>
          <SelectItem value="mozambican">Mozambican</SelectItem>
          <SelectItem value="namibian">Namibian</SelectItem>
          <SelectItem value="nauruan">Nauruan</SelectItem>
          <SelectItem value="nepalese">Nepalese</SelectItem>
          <SelectItem value="new_zealander">New Zealander</SelectItem>
          <SelectItem value="ni_vanuatu">Ni-Vanuatu</SelectItem>
          <SelectItem value="nicaraguan">Nicaraguan</SelectItem>
          <SelectItem value="nigerien">Nigerien</SelectItem>
          <SelectItem value="north_korean">North Korean</SelectItem>
          <SelectItem value="norwegian">Norwegian</SelectItem>
          <SelectItem value="omani">Omani</SelectItem>
          <SelectItem value="pakistani">Pakistani</SelectItem>
          <SelectItem value="palauan">Palauan</SelectItem>
          <SelectItem value="panamanian">Panamanian</SelectItem>
          <SelectItem value="papua_new_guinean">Papua New Guinean</SelectItem>
          <SelectItem value="paraguayan">Paraguayan</SelectItem>
          <SelectItem value="peruvian">Peruvian</SelectItem>
          <SelectItem value="philippine">Philippine</SelectItem>
          <SelectItem value="polish">Polish</SelectItem>
          <SelectItem value="portuguese">Portuguese</SelectItem>
          <SelectItem value="qatarian">Qatarian</SelectItem>
          <SelectItem value="romanian">Romanian</SelectItem>
          <SelectItem value="russian">Russian</SelectItem>
          <SelectItem value="rwandan">Rwandan</SelectItem>
          <SelectItem value="saint_lucian">Saint Lucian</SelectItem>
          <SelectItem value="salvadoran">Salvadoran</SelectItem>
          <SelectItem value="samoan">Samoan</SelectItem>
          <SelectItem value="sao_tomean">Sao Tomean</SelectItem>
          <SelectItem value="saudi">Saudi</SelectItem>
          <SelectItem value="scottish">Scottish</SelectItem>
          <SelectItem value="senegalese">Senegalese</SelectItem>
          <SelectItem value="serbian">Serbian</SelectItem>
          <SelectItem value="seychellois">Seychellois</SelectItem>
          <SelectItem value="sierra_leonean">Sierra Leonean</SelectItem>
          <SelectItem value="singaporean">Singaporean</SelectItem>
          <SelectItem value="slovak">Slovak</SelectItem>
          <SelectItem value="slovene">Slovene</SelectItem>
          <SelectItem value="solomon_islander">Solomon Islander</SelectItem>
          <SelectItem value="somali">Somali</SelectItem>
          <SelectItem value="south_african">South African</SelectItem>
          <SelectItem value="south_korean">South Korean</SelectItem>
          <SelectItem value="south_sudanese">South Sudanese</SelectItem>
          <SelectItem value="spanish">Spanish</SelectItem>
          <SelectItem value="sri_lankan">Sri Lankan</SelectItem>
          <SelectItem value="sudanese">Sudanese</SelectItem>
          <SelectItem value="surinamer">Surinamer</SelectItem>
          <SelectItem value="swazi">Swazi</SelectItem>
          <SelectItem value="swedish">Swedish</SelectItem>
          <SelectItem value="swiss">Swiss</SelectItem>
          <SelectItem value="syrian">Syrian</SelectItem>
          <SelectItem value="taiwanese">Taiwanese</SelectItem>
          <SelectItem value="tajik">Tajik</SelectItem>
          <SelectItem value="tanzanian">Tanzanian</SelectItem>
          <SelectItem value="thai">Thai</SelectItem>
          <SelectItem value="togolese">Togolese</SelectItem>
          <SelectItem value="tongan">Tongan</SelectItem>
          <SelectItem value="trinidadian">Trinidadian</SelectItem>
          <SelectItem value="tunisian">Tunisian</SelectItem>
          <SelectItem value="turkish">Turkish</SelectItem>
          <SelectItem value="turkmen">Turkmen</SelectItem>
          <SelectItem value="tuvaluan">Tuvaluan</SelectItem>
          <SelectItem value="ugandan">Ugandan</SelectItem>
          <SelectItem value="ukrainian">Ukrainian</SelectItem>
          <SelectItem value="uruguayan">Uruguayan</SelectItem>
          <SelectItem value="uzbek">Uzbek</SelectItem>
          <SelectItem value="vanuatuan">Vanuatuan</SelectItem>
          <SelectItem value="venezuelan">Venezuelan</SelectItem>
          <SelectItem value="vietnamese">Vietnamese</SelectItem>
          <SelectItem value="welsh">Welsh</SelectItem>
          <SelectItem value="yemeni">Yemeni</SelectItem>
          <SelectItem value="zambian">Zambian</SelectItem>
          <SelectItem value="zimbabwean">Zimbabwean</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectCitizenship;
