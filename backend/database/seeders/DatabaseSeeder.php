<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use App\Models\Profile;
use App\Models\Project;
use App\Models\Skill;

class DatabaseSeeder extends Seeder
{
    public function run(): void
{
    // Création du profil
    Profile::create([
        'name' => 'Khadija AFIFI',
        'title' => 'Développeuse Full-Stack',
        'bio' => 'Je transforme des idées en expériences digitales exceptionnelles',
        'philosophy' => 'Je crois en la puissance du code propre, des interfaces intuitives et des solutions innovantes.',
        'image' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
        'email' => 'khadija.afifi.13@example.com',
        'github' => 'https://github.com/khadijaafifi',
        'linkedin' => 'https://linkedin.com/in/khadijaafifi'
    ]);

    // Création des projets
    Project::create([
        'title' => 'Guide Touristique Maroc',
        'description' => 'Application web pour découvrir les lieux touristiques du Maroc',
        'technologies' => json_encode(['React', 'Laravel', 'MySQL', 'Leaflet']),
        'url' => 'https://guide-maroc.example.com',
        'color' => 'from-green-500 to-yellow-500'
    ]);

    Project::create([
        'title' => 'Chat Vocal IA',
        'description' => 'Application de chat vocal utilisant Whisper, Mistral et VITS',
        'technologies' => json_encode(['React', 'Laravel', 'Node.js', 'Python']),
        'url' => 'https://chat-ia.example.com',
        'color' => 'from-blue-500 to-purple-500'
    ]);

    Project::create([
        'title' => 'Cars Website',
        'description' => 'Site web interactif pour explorer des voitures en stock et consulter leurs détails',
        'technologies' => json_encode(['React', 'Laravel', 'MySQL', 'Axios']),
        'url' => 'https://cars.example.com',
        'color' => 'from-red-500 to-orange-500'
    ]);

    // Création des compétences
    Skill::create(['name' => 'React', 'level' => 95]);
    Skill::create(['name' => 'Laravel', 'level' => 90]);
    Skill::create(['name' => 'JavaScript', 'level' => 70]);
    Skill::create(['name' => 'MySQL', 'level' => 85]);
    Skill::create(['name' => 'MapLibre/Leaflet', 'level' => 80]);
}

}