<?php

use Illuminate\Database\Seeder;
use Illuminate\Foundation\Testing\WithFaker;

class LeadsSeeder extends Seeder
{

    use WithFaker;

    /**
     * @var array
     */
    private $r_vars;

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $items = [];
        $itemsToSeed = 500;
        $dt = new DateTime('now');
        $secondsInWeek = 60 * 60 * 24 * 7;

        for ($i = 0; $i < $itemsToSeed; $i++) {
            $faker = \Faker\Factory::create();

            $name = $faker->firstName() . ' ' .$faker->lastName;
            $randomDt = clone $dt;
            $randChange = rand(0, $secondsInWeek);
            $randomDt->modify("- $randChange seconds");
            $items[] = [
                'name' => $name,
                'email' => strtolower(str_replace(' ', '.', $name)) . '@bark.com',
                'phone' => $this->randomUkNumber(),

                // 33% of the time, include a random project detail
                'more_info' => rand(1,3) == 1 ? $this->randomLeadDetails() : null,
                'location_id' => rand(1, 950),
                'service_id' => rand(1, 90),
                'created_at' => $randomDt->format('Y-m-d H:i:s'),
                'updated_at' => $randomDt->format('Y-m-d H:i:s')
            ];
        }

        usort($items, function ($item1, $item2) {
            return $item1['created_at'] <=> $item2['created_at'];
        });

        DB::table('leads')->truncate();
        DB::table('leads')->insert($items);
    }

    private function randomUkNumber() {
        $numberStarts = ['+441', '+442', '+443', '+447', '+448'];
        $digitsToRandomise = 9;
        return $numberStarts[array_rand($numberStarts)] . str_pad(rand(0, pow(10, $digitsToRandomise)-1), $digitsToRandomise, '0', STR_PAD_LEFT);
    }

    private function randomLeadDetails() {
        $filmQuotes = [
            "6 month old Jack Russell x, struggled at puppy school. Slowly getting commands like sit, down etc but gets distracted easily",
            "1 Bay Window and 1 Kitcken window",
            "2 seater 1 chair",
            "1x Lounge. 3x  bedrooms. study",
            "35 feet of 4 foot chain link fence and a gate",
            "2 x boxes 50 high x 50 wide. Bookshelf 100 high x 55 wide. 2 x copper trays @57 diameter . Lamp 95 high x 55 wide . Lamp shade 68 cm high x 40 wide. Painting 42 x 42",
            "2 cameras required. 1 out front. 1 out back. Recordable video required with access through phone",
            "5 person office going to the airport Thursday, coming back Saturday.",
            "4 6ft panels & posts need replacing, one end is concrete which is ok.",
            "2 lots",
            "5 months old, never had nails clipped. I have tried to familiarise him with clippers but doesn’t like it",
            "2 walls to be skimmed ..",
            "15 week old puppy. Knows basic commands. started biting feet",
            "1 door needs rehanging. Hinges need to go up a bit using the stronger part of the frame.",
            "72 years old",
            "2 male litter mates. I am not sure if their play is appropriate. I would also like some help on getting them housebroken... They are rescued from a shelter, so I don't know much about them... Their names are Elton and Bernie",
            "1 double bed baby's cot chest of draws 2 bedside cabinets n few boxes",
            "3 bedroom house fully carpeted in the long and dining area including a hallway. Just moved in and previous tenants did not maintain, years of dirt",
            "2 x 25m fences on either side of garden.  There is an existing low chain link boundary fence to remove.",
            "1500 sq ft Beauty Supply retail store. I want a nice elegant space with urban feel that will display haircare products, styling tools, hair extensions, cosmetics, and accessories. I have attached my logo for reference.",
            "1066 sq ft condo",
            "5 areas leaking",
            "2 bedroom 2 story apartment. 1.5 bathrooms. 1 kitchen and oven needs cleaning n living room",
            "2 piece suite in back garden",
            "4 desks size 140cm x 84cm x 46cm to be moved from Office in Whitefield to office in Oldham by Wednesday afternoon at the latest",
            "30 square meters",
            "2 further TVs on bedroom walls with lead for connecting gaming console and Cable Box. The gaming console will be moved between the three TVs so easy access to plug in and unplug HBMI cable required",
            "15 years old yard",
            "50sq meter",
            "8yr old neutered male cocker spaniel with aggression issues",
            "19'x11' feet area (earth) see pictures. Excavate 24 deep. Fill with 3/4 rock of approximately 19",
            "2 bed house to 3 bed house, morning preferred, 16th or 17th November",
            "1 x3 seater coach, 1 x 2 seater coach and 1 seater coach",
            "\t",
            "1 single bed needs moving 2 miles. Has been dismantled but no car big enough to transport.",
            "5month old Frenchie who we have been working on potty training with crate but she still pees wherever she feels like. The only commands she follows is to medic my two big Shepard Huskies in what they do when I give commands but doesn’t do it on her own.",
            "3 bedroom new build small detached house",
            "1st birthday — very small, but want it took have good production for photos.",
            "2 walls grey and 2 walls blue paint supplied, doors and door frames white and window frames white",
            "2 hours work for two man and a man. 3 beds(boxed) two drawers, 1  light 3 seater sofa. 1 light 2 seater bed. 1 mirror . 1 dismantled display cabinet",
            "5600 square foot Distillery. Pre-Engineered Steel building. Have Structural drawings and rough floor plans but need some dress’s and utility as well as civil and foundation drawings and windstorm cert. Also will be taking builds on turn-key build. Mostly warehouse.. some steam lines and electrical as well as plumbing and hvac.. 30’x30’ Finished-out tasting room and two ADA restrooms",
            "3 month old male yellow lab, registered in AKC. He is potty trained, can sit l, and knows his name Albie, but besides that we need some help to focus! I'd also like to get him to stop trying to eat everything. He also needs to socialize with some well mannered dogs. The neighbors dog doesn't like to play and it makes him sad. Thank you- Lindsey Barber and Albie",
            "5 primed doors.two doors half glass. skirting board in kitchen and sittingroomplus utility room total skirting app 100 foot also 5 door frames need primer plus painting.all doors painted white architraves to be painted also.",
            "18th birthday party",
            "3 Bed Detached House, marketing photos required.",
            " ",
            "3 seater couch needs cleaning",
            "6 month old Cocker Spaniel",
            "1) Leaking gutter is on the loft domer. 2) Damaged gutter is on a single storey garage in the back garden",
            "4  mirrors to hang and a clock",
            "7 concrete posts. 7 panels. I would like to make you aware that according to my deeds I am not responsible for this fence but have agreed with my neighbour to pay half.",
            "30' x 14' I would ideally like to increase height by 2 feet.",
            "10 week old puppy named Rox.. Bites and growls, barks excessively but extremely loving little puppy when he is calm.",
            "2 chihuahuas mother and son",
            "",
            "2 beds, wardrobe, dressing table, chest of drawers, 2 seater settee, armchair, coffee table, standard lamp",
            "2 months ago i got a patrician wall removed, now I have the above floor really loud creaking and there is a raised board, I am extremely worried about it - this wall was plasterboard that was there to take you through to a small hallway to the back door, the guy left the large wooden beam in which went out to the wall?",
            "7 Windows total. Two floor semi detached.",
            "50th Birthday for my sister in law! . . I was looking for some kind of fusion asian tasting menu or 5/4 courses. Must be vegetarian for the birthday girl but for the other 2 fish or chicken can be included.",
            "10ft ceiling, skylight 1.2 × 66cms, fixed skylight flat roof",
            "6 acre plot to be landscaped and designed",
            "6 acres. Looking for landscaping design help",
            "55m2 x 100m tarmac needed is existing property",
            "1. Fit new curtain pole for eyelet thermal curtains with tie back in the living room.  Attached is a photo of old track, and new curtain set.   In room 2. Fit curtain pole for eyelet noise reduction curtain.  It's one wide curtain, I'm still waiting for that one to arrive.  Do you supply appropriate fittings for work including pole.",
            "2 Cockapoos",
            "2 outdoor  Cameras and full installation wanted.",
            "9th Floor apartment end of tenancy clean. Lift and off-road parking available. . . Hard floor through lounge/kitchen and hallway, carpet in the 3 bedrooms, which need a thorough cleaning. One main bathroom with bath, second bathroom is ensuite with shower, both are tiled. Apartment will be empty prior to cleaning.",
            "1st floor windows with no access from inside",
            "3 bedrooms need carpets lifting and replacing . Wood worm  work being done - hence need to move carpets",
            "1 hectare for Morning. I need some advise. We are busy with a project in Polokwane. Its a family amusement/entertainment park and venue hire with a splash pool and games. Confidence",
            "6 new radiators to be fitted , All flooring is lifted , 1 radiators to be moved position , water mains to be moved 30cm",
            "4 bedroom house, needs wallpaper removed and painting throughput",
            "20 year anniversary, got our 3 kids with us, it was hard to try and think of something special for my husband, he will really love this, we were gong overseas for it but......!! we are after a drop off in Williamstown then maybe a pickup if that’s suitable on your end. We are going to dinner at pelicans landing",
            "60's style ranch over a basement...want to add large front porch / patio with firepit and seating. Front door will need to be moved as well....want to expand enough for circular driveway cover....",
            "14 month old BC with high chase drive - bicycles, skateboards, cars too. difficult to walk. I have only had him for 6 weeks. he will chase a bike. if the bike stops he is fine, not interested in the rider, just the wheels and pedals. This was a known issue when I adopted him. we've been building a good relationship but it all goes out the window when a speeding bike comes near us.",
            "2 items of furniture.  Both collection and delivery on ground floor. Delivery will be into a conservatory accessible from the outside",
            "2 rooms knocked into 1. Terraced house. 2 internal doors to prep and paint. 1 set small double doors to prep and paint. approx 3mx7m",
            "2/3 bed flat. Available to rent from 1/12",
            "50th birthday party for 30-35 people.  I am interested in a versatile acoustic performer that can even do covers.",
            "2 seater sofa from Coventry to kenilworth and remove 1 x 3 seater sofa bed to take away",
            "1.remove bath. 2.re position shower (new). 3. replace toilet pan outlet pipe . 4. re tile",
            "2 large trees need trimming",
            "170cm high 180cm width",
            "9 x 12 loose carpet  just loose chairs on it.",
            "3 Concrete posts need replacing and 2 end wooden posts securing/replacing.",
            "3 Bedrooms around the walk areas only + Hallway and lounge",
            "1 bed mid terrace house...routine clean of guttering required",
            "5 bedroom 2 living areas",
            "2x kids ages 2&1",
            "6 Palm trees that needs to be removed or felled and some rubble and garden refuse that needs to be removed",
            "2 sisters 16 months, same litter, extremely affectionate, need to learn control walking, voice commands, etc.  No issues with other dogs or people, very enthusiastic.",
            "4 piece candle holder set. (3 candle holders and 1 candle holder plate)",
            "1 bed apartment with ocean glimpses",
            "3 adults going to gerringing from Wollongong for dinner",
            "1 hedge 6.0 long the other 3.0, both ficus hillie.",
            "2 people no seafood",
            "4-6 year old Treeing Walker coonhound needs exercise. He is a healthy and fit rescue we’ve had for a short time.  He is pretty good on a leash, but not perfect, as he loves to stop and sniff.  He is friendly to people and other animals. He can easily keep up on a jog of 30 minutes or more, or is happy to walk and enjoy the smells.",
            "2 hour corporate function for Little Wings volunteers. We need a security guard to",
            "3 units on a block. Nature strip, front garden and 2 very small back areas",
            "50\" smart tv need mounted onto living room wall - i have bracket already. . . issue may be the antenna cord being able to reach the socket near the floor . . otherwise no other issues. . regards Sam",
        ];
        return $filmQuotes[array_rand($filmQuotes)];
    }
}


