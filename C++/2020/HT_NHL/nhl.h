#ifndef NHL_H
#define NHL_H
#include<iostream>
#include<vector>

namespace otecpp_nhl {
    class Date {
        // Päivä, kuukausi, vuosi yksityisinä
        int d, m, y;

        public:
        Date(std::string s);
        Date(int p, int k, int v);
        int day() const;
        int month() const;
        int year() const;
        bool operator<(Date &b);
        bool operator<(const Date &b) const;
    };
    std::ostream & operator<<(std::ostream &virta, Date &b);
    std::ostream & operator<<(std::ostream &virta, const Date &b);

    class Player {
        // Yksityiset muuttujat
        int identity, team_identity;
        std::string nimi;
        std::string j_nimi;
        char pos;
        std::string maa;
        Date pvm;

        public:
        Player(int i, int t_i, std::string n, std::string j_n, char p, std::string cou, Date d);
        int id() const;
        int team_id() const;
        const std::string & name() const;
        const std::string & t_name() const;
        char position() const;
        const std::string & country() const;
        const Date & birthDate() const;
        bool operator<(Player &b);
        bool operator<(const Player &b) const;
    };
    std::ostream & operator<<(std::ostream &virta, Player &b);
    std::ostream & operator<<(std::ostream &virta, const Player &b);

    class Stat {
        // Yksityiset muuttujat
        int p_id, assist, goal, game, p_m;
        
        public:
        Stat(int id, int a, int go, int ga, int p);
        int player_id() const;
        int assists() const;
        int goals() const;
        int games() const;
        int plus_minus() const;
    };
    std::ostream & operator<<(std::ostream &virta, Stat &b);
    std::ostream & operator<<(std::ostream &virta, const Stat &b);

    class Stats {
        public:
        std::vector<Stat> tilastot;
        Stats(std::vector<Stat> t);
        Stat stat(int player_id) const;
        std::vector<Stat> statsBy(std::string order="points") const;
    };

    class Team {
        int t_id;
        std::string abr, t_name;
        std::vector<Player> pelaajat;

        public:
        Team(int team_id, std::string a, std::string team_name, std::vector<Player> players);
        int id() const;
        const std::string & abbreviation() const;
        const std::string & name() const;
        const std::vector<Player> & players() const;
        bool operator<(Team &b) const;
        bool operator<(const Team &b) const;
    };
    std::ostream & operator<<(std::ostream &virta, Team &b);
    std::ostream & operator<<(std::ostream &virta, const Team &b);

    class League {
        std::vector<Team> joukkueet;
        std::vector<Player> pelaajat;
        Stats tilastot;

        public:
        League(std::string joukkue, std::string pelaaja, std::string tilasto);
        const std::vector<Team> & teams() const;
        const std::vector<Player> & players() const;
        const Stats & stats() const;
    };

    // Ylimääräiset apufunktiot tiedostojen lukuun 
    std::vector<int> stringPvm(std::string s);
    std::vector<int> stringPvm2(std::string s);
    std::vector<Team> alphabeticalSortTeams(std::vector<Team> joukkueet);
    std::vector<Team> lueJoukkueet(std::string j, std::string p);
    std::vector<Player> alphabeticalSort(std::vector<Player> pelaajat);
    std::vector<Player> luePelaajat(std::string j, std::string p);
    Stats lueTilastot(std::string s);
}

#endif