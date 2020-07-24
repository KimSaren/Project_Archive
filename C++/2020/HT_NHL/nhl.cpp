#include<iostream>
#include<fstream>
#include<string>
#include<vector>
#include<cstddef>
#include<iomanip>
#include<algorithm>
#include "nhl.h"

using namespace std;

namespace otecpp_nhl {
    // Oletus: string muotoa paiva.kuukausi.vuosi
    vector<int> stringPvm(string s) {
        vector<int> taulu;
        unsigned int newpos = 0, pos = 0;
        string uusi;
        for(unsigned int i = 0; i < 3; ++i) {
            newpos = s.find(".",pos);
            if(newpos != string::npos) {
                uusi = s.substr(pos,newpos-pos);
                pos = newpos+1;
            }
            else {
                uusi = s.substr(pos,s.length()-pos);
            }
            taulu.push_back(stoi(uusi));
        }
        return taulu;
    }

    // Oletus: string muotoa paiva-kuukausi-vuosi
    vector<int> stringPvm2(string s) {
        vector<int> taulu;
        unsigned int newpos = 0, pos = 0;
        string uusi;
        for(unsigned int i = 0; i < 3; ++i) {
            newpos = s.find("-",pos);
            if(newpos != string::npos) {
                uusi = s.substr(pos,newpos-pos);
                pos = newpos+1;
            }
            else {
                uusi = s.substr(pos,s.length()-pos);
            }
            taulu.push_back(stoi(uusi));
        }
        return taulu;
    }

    Date::Date(std::string s): d(stringPvm(s)[0]), m(stringPvm(s)[1]), y(stringPvm(s)[2]) {}

    Date::Date(int p, int k, int v): d(p), m(k), y(v) {}

    int Date::day() const {
        return d;
    }
    int Date::month() const {
        return m;
    }
    int Date::year() const {
        return y;
    }

    bool Date::operator<(Date &b) {
        // vertailu ensin vuosien, sitten kuukausien ja lopulta päivien mukaan
        if(this->year() < b.year()) {
            return true;
        }
        else if((this->year() == b.year()) && (this->month() < b.month())) {
            return true;
        }
        else if((this->year() == b.year()) && (this->month() == b.month()) && (this->day() < b.day())) {
            return true;
        }
        // Mulloin false
        else {
            return false;
        }
        
    }
    bool Date::operator<(const Date &b) const {
        // vertailu ensin vuosien, sitten kuukausien ja lopulta päivien mukaan
        if(this->year() < b.year()) {
            return true;
        }
        else if((this->year() == b.year()) && (this->month() < b.month())) {
            return true;
        }
        else if((this->year() == b.year()) && (this->month() == b.month()) && (this->day() < b.day())) {
            return true;
        }
        // Mulloin false
        else {
            return false;
        }
    }

    ostream & operator<<(ostream &virta, Date &b) {
        virta << b.day() << "." << b.month() << "." << b.year();
        return virta;
    }
    ostream & operator<<(ostream &virta, const Date &b) {
        virta << b.day() << "." << b.month() << "." << b.year();
        return virta;
    }


    // Pelaajaan liittyvät toiminnallisuudet
    Player::Player(int i, int t_i, string n, string j_n, char p, std::string cou, Date d): identity(i), team_identity(t_i), nimi(n), j_nimi(j_n), pos(p), maa(cou), pvm(d) {}

    int Player::id() const {
        return identity;
    }
    int Player::team_id() const {
        return team_identity;
    }
    const std::string & Player::name() const {
        return nimi;
    }
    const std::string & Player::t_name() const {
        return j_nimi;
    }
    char Player::position() const {
        return pos;
    }
    const std::string & Player::country() const {
        return maa;
    }
    const Date & Player::birthDate() const {
        return pvm;
    }

    bool Player::operator<(Player &b) {
        Date d1 = this->birthDate();
        Date d2 = b.birthDate();
        // Verrataan ensin nimiä
        if(this->name().compare(b.name()) < 0) {
            return true;
        }
        // Toissijaisesti date-arvoja edit. NUORUUSJÄRJESTYS????
        else if((this->name().compare(b.name()) == 0) && (d2 < d1)) {
            return true;
        }
        // Viimeisenä id-arvoja
        else if((this->name().compare(b.name()) == 0) && (!(d1 < d2) && !(d2 < d1)) && (this->id() < b.id())) {
            return true;
        }
        else {
            return false;
        }
    }
    bool Player::operator<(const Player &b) const {
        Date d1 = this->birthDate();
        Date d2 = b.birthDate();
        // Verrataan ensin nimiä
        if(this->name().compare(b.name()) < 0) {
            return true;
        }
        // Toissijaisesti date-arvoja edit. NUORUUSJÄRJESTYS????
        else if((this->name().compare(b.name()) == 0) && (d2 < d1)) {
            return true;
        }
        // Viimeisenä id-arvoja
        else if((this->name().compare(b.name()) == 0) && (!(d1 < d2) && !(d2 < d1)) && (this->id() < b.id())) {
            return true;
        }
        else {
            return false;
        }
    }

    ostream & operator<<(ostream &virta, Player &b) {
        virta << b.name() << "; " << b.t_name() << "; " << b.country() << "; " << b.birthDate().day() << "." << b.birthDate().month() << "." << b.birthDate().year();
        return virta;
    }
    ostream & operator<<(ostream &virta, const Player &b) {
        virta << b.name() << "; " << b.t_name() << "; " << b.country() << "; " << b.birthDate().day() << "." << b.birthDate().month() << "." << b.birthDate().year();
        return virta;
    }


    // Yksittäiseen tilastoon liittyvät toiminnallisuudet
    Stat::Stat(int id, int a, int go, int ga, int p): p_id(id), assist(a), goal(go), game(ga), p_m(p) {}

    int Stat::player_id() const {
        return p_id;
    }
    int Stat::assists() const {
        return assist;
    }
    int Stat::goals() const {
        return goal;
    }
    int Stat::games() const {
        return game;
    }
    int Stat::plus_minus() const {
        return p_m;
    }

    ostream & operator<<(ostream &virta, Stat &b) {
        float ppg;
        if(b.games() != 0) {
            ppg = ((float)b.goals() + (float)b.assists())/(float)b.games();
        }
        else {
            ppg = 0.00;
        }
        
        virta << b.goals()+b.assists() << " points, " << b.goals() << " goals, " << b.assists() << " assists, " << b.games() << " games, " << setprecision(2) << fixed << ppg  << " points per game, plus/minus: " << b.plus_minus();
        return virta;
    }
    ostream & operator<<(ostream &virta, const Stat &b) {
        float ppg;
        if(b.games() != 0) {
            ppg = ((float)b.goals() + (float)b.assists())/(float)b.games();
        }
        else {
            ppg = 0.00;
        }

        virta << b.goals()+b.assists() << " points, " << b.goals() << " goals, " << b.assists() << " assists, " << b.games() << " games, " << setprecision(2) << fixed << ppg << " points per game, plus/minus: " << b.plus_minus();
        return virta;
    }


    // Koko tilastojen toiminnallisuuksia
    Stats::Stats(vector<Stat> t): tilastot(t) {}

    Stat Stats::stat(int player_id) const {
        vector<Stat> t = this->tilastot;
        // Haetaan tilastosta sopivan id omaava stat-olio
        for(unsigned int i = 0; i < t.size(); ++i) {
            if(t[i].player_id() == player_id) {
                return t[i];
            }
        }
        Stat tyhja(player_id, 0, 0, 0, 0);
        return tyhja;
    }

    vector<Stat> Stats::statsBy(string order) const {
        // Käytetään olemassaolevaa taulukkoa ja lajitellaan se "order"-parametrin määrämässä järjestyksessä
        vector<Stat> t = this->tilastot;
        for(unsigned int i = 0; i < t.size(); ++i) {
            for(unsigned int j = 1; j < t.size(); ++j) {
                if(order.compare("points") == 0) {
                    if((t[j-1].goals() + t[j-1].assists()) < (t[j].goals() + t[j].assists())) {
                        iter_swap(t.begin() + (j-1), t.begin()+j);
                    }
                    else if((t[j-1].goals() + t[j-1].assists()) == (t[j].goals() + t[j].assists()) && (t[j-1].player_id() < t[j].player_id())) {
                        iter_swap(t.begin() + (j-1), t.begin()+j);
                    }
                }
                else if(order.compare("goals") == 0) {
                    if(t[j-1].goals() < t[j].goals()) {
                        iter_swap(t.begin() + (j-1), t.begin()+j);
                    }
                    else if((t[j-1].goals()) == (t[j].goals()) && (t[j-1].player_id() < t[j].player_id())) {
                        iter_swap(t.begin() + (j-1), t.begin()+j);
                    }
                }
                else if(order.compare("assists") == 0) {
                    if(t[j-1].assists() < t[j].assists()) {
                        iter_swap(t.begin() + (j-1), t.begin()+j);
                    }
                    else if((t[j-1].assists()) == (t[j].assists()) && (t[j-1].player_id() < t[j].player_id())) {
                        iter_swap(t.begin() + (j-1), t.begin()+j);
                    }
                }
                else if(order.compare("points_per_game") == 0) {
                    float ppg1;
                    if(t[j-1].games() == 0) {
                        ppg1 = 0;
                    }
                    else {
                        ppg1 = ((float)t[j-1].goals() + (float)t[j-1].assists())/(float)t[j-1].games();
                    }

                    float ppg2;
                    if(t[j].games() == 0) {
                        ppg2 = 0;
                    }
                    else {
                        ppg2 = ((float)t[j].goals() + (float)t[j].assists())/(float)t[j].games();
                    }

                    if(ppg1 < ppg2) {
                        iter_swap(t.begin() + (j-1), t.begin()+j);
                    }
                    else if((ppg1 == ppg2) && (t[j-1].player_id() < t[j].player_id())) {
                        iter_swap(t.begin() + (j-1), t.begin()+j);
                    }
                }
            }
        }
        return t;
    }


    // Yhden joukkueen toiminnallisuudet
    Team::Team(int team_id, std::string a, std::string team_name, std::vector<Player> players): t_id(team_id), abr(a), t_name(team_name), pelaajat(players) {}

    int Team::id() const {
        return t_id;
    }
    const std::string & Team::abbreviation() const {
        return abr;
    }
    const std::string & Team::name() const {
        return t_name;
    }
    const std::vector<Player> & Team::players() const {
        return pelaajat;
    }
    bool Team::operator<(Team &b) const {
        if(this->name().compare(b.name()) < 0) {
             return true;
        }
        // Toissijaisesti id-arvojen vertailu
        else if(((this->name().compare(b.name()) == 0)) && (this->id()<b.id())) {
            return true;
        }
        else {
            return false;
        }   
    }
    bool Team::operator<(const Team &b) const {
        if(this->name().compare(b.name()) < 0) {
             return true;
        }
        // Toissijaisesti id-arvojen vertailu
        else if(((this->name().compare(b.name()) == 0)) && (this->id()<b.id())) {
            return true;
        }
        else {
            return false;
        }     
    }
    ostream & operator<<(ostream &virta, Team &b) {
        virta << b.name() << " (" << b.abbreviation() << ")";
        return virta;
    }
    ostream & operator<<(ostream &virta, const Team &b) {
        virta << b.name() << " (" << b.abbreviation() << ")";
        return virta;
    }


    // Ylimääräiset apufunktiot tiedostojen lukuun
    vector<Player> alphabeticalSort(std::vector<Player> pelaajat) {
        for(unsigned int i = 0; i < pelaajat.size(); ++i) {
            for(unsigned int j = 1; j < pelaajat.size(); ++j) {
                string name1 = pelaajat[j-1].name();
                string name2 = pelaajat[j].name();
                // Lajittelu ensin nimen, sitten syntymäajan ja lopulta id-arvon mukaan
                if(name1.compare(name2) > 0) {
                    iter_swap(pelaajat.begin() + (j-1), pelaajat.begin()+j);
                }
                else if((name1.compare(name2) == 0) && (pelaajat[j-1].birthDate() < pelaajat[j].birthDate())) {
                    iter_swap(pelaajat.begin() + (j-1), pelaajat.begin()+j);
                }
                else if((name1.compare(name2) == 0) && (!(pelaajat[j-1].birthDate() < pelaajat[j].birthDate()) && !(pelaajat[j].birthDate() < pelaajat[j-1].birthDate())) && (pelaajat[j-1].id() > pelaajat[j].id())) {
                    iter_swap(pelaajat.begin() + (j-1), pelaajat.begin()+j);
                }
            }
        }
        return pelaajat;
    }

    vector<Player> luePelaajat(std::string j, std::string s) {
        vector<Player> pelaajat;
        vector<string> rivit, rivit2;
        int id, t_id, n_id;
        unsigned int np, newpos, pos;
        char pelipaikka;
        string str, str2, uusi, maa, nimi, j_nimi;
        // Luetaan joukkueita kuvaava tiedosto
        ifstream raw2(j);
        while(getline(raw2,str2)) {
            rivit2.push_back(str2);
        }
        // Haetaan tiedot pelaajista
        ifstream raw(s);
        while(getline(raw,str)) {
            newpos= 0, pos = 0;
            // Oletus: string muotoa id;joukkueen_id;nimi;pelipaikka;syntymämaa;syntymäaika
            // Etsitään merkin ";" indeksi
            newpos = str.find(";",pos);
            uusi = str.substr(pos, newpos-pos);
            pos = newpos+1;
            id = stoi(uusi);
            newpos = str.find(";",pos);
            uusi = str.substr(pos, newpos-pos);
            pos = newpos+1;
            t_id = stoi(uusi);
            newpos = str.find(";",pos);
            uusi = str.substr(pos, newpos-pos);
            pos = newpos+1;
            nimi = uusi;
            newpos = str.find(";",pos);
            uusi = str.substr(pos, newpos-pos);
            pos = newpos+1;
            pelipaikka = uusi[0];
            newpos = str.find(";",pos);
            uusi = str.substr(pos, newpos-pos);
            pos = newpos+1;
            maa = uusi;
            uusi = str.substr(newpos+1, str.length()-newpos);

            vector<int> t = stringPvm2(uusi);
            Date s_aika(t[2],t[1],t[0]);

                        
                        
            // Etistään joukkue
            for(unsigned int k = 0; k < rivit2.size(); ++k) { 
                // Oletus: rivit muotoa id;lyhenne;nimi
                np = rivit2[k].find(";", 0);
                n_id = stoi(rivit2[k].substr(0,np));
                np = rivit2[k].find(";",np+1);
                if(t_id == n_id) {
                    j_nimi = rivit2[k].substr(np+1, rivit2[k].length()-(np+1));
                    break;
                }
            }

            // Uusi pelaaja
            Player p(id,t_id,nimi,j_nimi,pelipaikka,maa,s_aika);
            pelaajat.push_back(p);
        }

        // Aakkosittain
        pelaajat = alphabeticalSort(pelaajat);

        // Palautetaan muodostettu taulukko
        return pelaajat;
    }

    vector<Team> alphabeticalSortTeams(std::vector<Team> joukkueet) {
        for(unsigned int i = 0; i < joukkueet.size(); ++i) {
            for(unsigned int j = 1; j < joukkueet.size(); ++j) {
                if(joukkueet[j-1].abbreviation().compare(joukkueet[j].abbreviation()) > 0) {
                    iter_swap(joukkueet.begin() + (j-1), joukkueet.begin()+j);
                }
            }
        }
        return joukkueet;
    }

    vector<Team> lueJoukkueet(string j, string p) {
        // Haetaan aluksi joukkueen id:tä vastaavat pelaajataulukko
        vector<Team> joukkueet;
        int id;
        string lyhenne, nimi;
        string str, str2, uusi;
        // Luetaan joukkueita kuvaava tiedosto
        ifstream raw(j);
        // Luetaan rivejä niin pitkään kuin on luettavaa
        while(getline(raw,str)) {
            unsigned int newpos, pos = 0;
            // Oletus: rivit muotoa id;lyhenne;nimi
            // Etsitään merkin ";" indeksi
            newpos = str.find(";",pos);
            uusi = str.substr(pos, newpos-pos);
            pos = newpos+1;
            id = stoi(uusi);
            newpos = str.find(";",pos);
            uusi = str.substr(pos, newpos-pos);
            pos = newpos+1;
            lyhenne = uusi;
            uusi = str.substr(pos, str.length()-pos);
            nimi = uusi;

            // Muodostetaan lopuksi joukkue saatujen tietojen pohjalta
            vector<Player> j_pelaajat;
            string uusi;
            int pos2 = 0;

            // Lisätään joukkueen pelaajat taulukkoon j_pelaajat
            ifstream raw2(p);
            while(getline(raw2,str2)) {
                pos2 = 0;
                unsigned int newpos2 = str2.find(";",pos2);
                int id2 = stoi(str2.substr(0,newpos2));
                pos2 = newpos2+1;
                newpos2 = str2.find(";",pos2);
                uusi = str2.substr(pos2, newpos2-pos);
                pos2 = newpos2+1;
                int t_id = stoi(uusi);
                if(t_id == id) {
                    
                    newpos2 = str2.find(";",pos2);
                    uusi = str2.substr(pos2, newpos2-pos2);
                    pos2 = newpos2+1;
                    string p_nimi = uusi;
                    newpos2 = str2.find(";",pos2);
                    uusi = str2.substr(pos2, newpos2-pos2);
                    pos2 = newpos2+1;
                    char pelipaikka = uusi[0];
                    newpos2 = str2.find(";",pos2);
                    uusi = str2.substr(pos2, newpos2-pos2);
                    pos2 = newpos2+1;
                    string maa = uusi;
                    uusi = str2.substr(newpos2+1, str2.length()-newpos2);

                    vector<int> t = stringPvm2(uusi);
                    Date s_aika(t[2],t[1],t[0]);

                    // Uusi pelaaja
                    Player p(id2,t_id,p_nimi,nimi,pelipaikka,maa,s_aika);
                    j_pelaajat.push_back(p);
                }
            }

            // Lajitellaan taulukko vielä
            j_pelaajat = alphabeticalSort(j_pelaajat);

            // Viimein muodostetaan joukkueen data
            Team uusi_joukkue(id, lyhenne, nimi, j_pelaajat);
            joukkueet.push_back(uusi_joukkue);
        }
        // Aakkosjärjestys
        joukkueet = alphabeticalSortTeams(joukkueet);
        return joukkueet;
    }

    Stats lueTilastot(string s) {
        int p_id, assists, goals, games, p_m;
        vector<Stat> tilastot;

        string str, uusi;
        ifstream raw(s);
        while(getline(raw,str)) {
            unsigned int newpos= 0, pos = 0;
            // Oletus: rivit muotoa "pelaajan id;syötöt;maalit;pelit;plus-miinus"
            for(unsigned int i = 0; i < 5; ++i) {
                // Haetaan merkkiä ";"
                newpos = str.find(";",pos);
                // Merkki löytyi
                if(newpos != string::npos) {
                    uusi = str.substr(pos, newpos-pos);
                    pos = newpos+1;
                }
                // Merkkiä ei löytynyt
                else {
                    uusi = str.substr(pos, str.length()-pos);
                }

                if(i == 0) {
                    p_id = stoi(uusi);
                }
                else if(i == 1) {
                    assists = stoi(uusi);
                }
                else if(i == 2) {
                    goals = stoi(uusi);
                }
                else if(i == 3) {
                    games = stoi(uusi);
                }
                else if(i == 4) {
                    p_m = stoi(uusi);

                    // Luodaan Stat-tilasto ja pusketaan se taulukkoon
                    Stat uusi_tilasto(p_id,assists,goals,games,p_m);
                    tilastot.push_back(uusi_tilasto);
                }
            }
        }
        // Luodaan uusi Stats-olio käyttämällä aiempaa taulukkoa
        Stats tilasto_olio(tilastot);
        return tilasto_olio;
    }


    // Liigan muodostaminen ja toiminnallisuudet
    League::League(string joukkue, string pelaaja, string tilasto): joukkueet(lueJoukkueet(joukkue,pelaaja)), pelaajat(luePelaajat(joukkue,pelaaja)), tilastot(lueTilastot(tilasto)) {}

    const std::vector<Team> & League::teams() const {
        return joukkueet;
    }
    const std::vector<Player> & League::players() const {
        return pelaajat;
    }
    const Stats & League::stats() const {
        return tilastot;
    }
}