<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Profile;
use App\Models\Project;
use App\Models\Skill;
use App\Models\Contact;
use Illuminate\Http\Request;

class PortfolioController extends Controller
{
    public function getProfile()
    {
        $profile = Profile::first();
        return response()->json($profile);
    }

    public function getProjects()
    {
        $projects = Project::all();
        return response()->json($projects);
    }

    public function getSkills()
    {
        $skills = Skill::orderBy('level', 'desc')->get();
        return response()->json($skills);
    }

    public function storeContact(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'message' => 'required|string'
        ]);

        $contact = Contact::create($validated);
        
        // Optionnel: Envoyer un email
        // Mail::to('votre@email.com')->send(new ContactMail($contact));

        return response()->json([
            'message' => 'Message envoyé avec succès',
            'contact' => $contact
        ], 201);
    }
}
