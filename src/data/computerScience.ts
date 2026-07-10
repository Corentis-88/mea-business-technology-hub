import type { Course, Topic } from "../types";

const topic = (value: Topic): Topic => value;

export const computerScienceCourse: Course = {
  id: "computer-science",
  slug: "computer-science",
  title: "OCR GCSE Computer Science",
  shortTitle: "Computer Science",
  qualification: "GCSE (9–1)",
  examBoard: "OCR",
  code: "J277",
  description:
    "Learn how computer systems work and develop the algorithmic and programming skills needed to solve problems.",
  accent: "#2563EB",
  icon: "cpu",
  assessmentSummary:
    "Two non-calculator papers. J277/01 Computer systems and J277/02 Computational thinking, algorithms and programming are each 1 hour 30 minutes, 80 marks and 50%.",
  aliases: [
    "OCR computing",
    "OCR computer science",
    "J277",
    "computing GCSE",
    "CS",
    "pseudocode",
    "OCR ERL",
  ],
  units: [
    {
      id: "j277-paper-1",
      code: "J277/01",
      title: "Paper 1: Computer systems",
      description:
        "CPU architecture, memory, storage, networks, security, systems software and the impacts of technology.",
      assessment:
        "External written examination; all questions compulsory; includes an 8-mark extended response.",
      weight: "50% · 80 marks · 1 hour 30 minutes",
      topics: [
        topic({
          id: "cs-1-1",
          code: "1.1",
          title: "Systems architecture",
          summary:
            "Understand the CPU, the fetch–decode–execute cycle, factors affecting performance and embedded systems.",
          keywords: [
            "CPU",
            "processor",
            "fetch decode execute",
            "FDE",
            "ALU",
            "control unit",
            "cache",
            "register",
            "MAR",
            "MDR",
            "PC",
            "accumulator",
            "clock speed",
            "cores",
            "embedded system",
          ],
          sections: [
            {
              heading: "The CPU and its components",
              paragraphs: [
                "The central processing unit executes instructions. In a Von Neumann system, instructions and data share memory.",
                "The control unit coordinates the cycle, the ALU performs arithmetic and logic, and cache stores frequently needed data close to the CPU.",
              ],
              bullets: [
                "MAR: address of the memory location currently being accessed.",
                "MDR: data or instruction moving to or from memory.",
                "PC: address of the next instruction.",
                "Accumulator: intermediate arithmetic and logic results.",
              ],
              visual: {
                kind: "cpu-cycle",
                title: "Fetch–decode–execute",
                caption:
                  "Follow the instruction address from the PC to the MAR, the instruction into the MDR, then decode and execute.",
                labels: ["Fetch", "Decode", "Execute", "Update PC"],
              },
            },
            {
              heading: "Performance and embedded systems",
              paragraphs: [
                "A higher clock speed can complete more cycles per second, more cores can process suitable tasks in parallel, and a larger cache can reduce slower main-memory access. Software and workload determine the actual benefit.",
                "An embedded system is built into a larger device for a specific purpose, such as controlling a washing machine or car braking system.",
              ],
              example:
                "A smart thermostat uses an embedded processor to read temperature and control heating; it does not need the general-purpose features of a laptop.",
            },
          ],
          keyTerms: [
            { term: "CPU", definition: "The processor that fetches, decodes and executes instructions." },
            { term: "Register", definition: "A very small, fast storage location inside the CPU." },
            { term: "Embedded system", definition: "A computer built into a larger device for a dedicated purpose." },
          ],
          commonMistakes: [
            "Saying the Program Counter stores the program; it stores the address of the next instruction.",
            "Claiming that doubling clock speed always doubles performance.",
            "Describing every small computer as embedded without identifying its dedicated role.",
          ],
          examTips: [
            "For register questions, state exactly what is stored, not simply that it 'holds data'.",
            "In performance scenarios, connect the factor to what the CPU can do and then to the user's task.",
          ],
          quiz: [
            {
              id: "cs-1-1-q1",
              prompt: "Which CPU register stores the address of the next instruction?",
              options: ["MDR", "Accumulator", "Program Counter", "MAR"],
              answer: 2,
              explanation: "The program counter stores the address of the next instruction that the CPU will fetch.",
            },
            {
              id: "cs-1-1-q2",
              prompt: "Why can increasing the cache size improve CPU performance?",
              options: [
                "It permanently stores every program",
                "It reduces how often the CPU must fetch frequently used data from slower RAM",
                "It increases the computer's secondary storage capacity",
                "It replaces the control unit",
              ],
              answer: 1,
              explanation: "Cache is fast memory close to the CPU. A larger cache can hold more frequently used data, so the CPU may spend less time fetching it from RAM.",
            },
          ],
          examQuestions: [
            {
              id: "cs-1-1-e1",
              command: "Explain",
              marks: 3,
              prompt: "Explain one reason why a games console may benefit from having multiple CPU cores.",
              guidance: [
                "Name the work that can happen at the same time.",
                "Link parallel processing to performance in this scenario.",
                "Do not claim that every instruction is automatically split across cores.",
              ],
              model:
                "Different suitable tasks, such as game logic and background audio, can be processed at the same time. This reduces the time spent waiting for one task to finish before another starts, which can make gameplay more responsive.",
            },
          ],
          durationMinutes: 45,
        }),
        topic({
          id: "cs-1-2",
          code: "1.2",
          title: "Memory, storage and data representation",
          summary:
            "Compare memory and storage, convert number systems, calculate file sizes and choose suitable compression.",
          keywords: [
            "RAM",
            "ROM",
            "virtual memory",
            "secondary storage",
            "binary",
            "denary",
            "hexadecimal",
            "overflow",
            "shift",
            "ASCII",
            "Unicode",
            "pixel",
            "resolution",
            "colour depth",
            "sample rate",
            "bit depth",
            "lossy",
            "lossless",
            "file size",
          ],
          sections: [
            {
              heading: "Memory and secondary storage",
              paragraphs: [
                "RAM holds programs and data currently in use and is volatile. ROM is non-volatile and commonly stores startup instructions. Virtual memory uses secondary storage when RAM is insufficient, but is slower than RAM.",
                "Magnetic, optical and solid-state storage differ in capacity, speed, portability, durability, reliability and cost. Choose using the scenario, not a memorised 'best' device.",
              ],
            },
            {
              heading: "Numbers and units",
              paragraphs: [
                "Binary uses base 2, denary base 10 and hexadecimal base 16. Eight-bit addition can overflow when the result needs a ninth bit. A left binary shift multiplies by powers of two if no significant bit is lost; a right shift divides using integer place values.",
              ],
              bullets: [
                "1 byte = 8 bits; 1 nibble = 4 bits.",
                "OCR uses 1 KB = 1000 bytes; a clearly shown 1024 conversion is also accepted where appropriate.",
                "Convert units before comparing a calculation with a storage capacity.",
              ],
              visual: {
                kind: "binary-place-value",
                title: "Eight-bit place values",
                caption: "Add the place values containing a 1 to convert binary to denary.",
                labels: ["1", "0", "1", "1", "0", "1", "0", "1"],
                values: [128, 64, 32, 16, 8, 4, 2, 1],
              },
            },
            {
              heading: "Representing text, images and sound",
              paragraphs: [
                "Character sets map characters to binary codes. More bits allow more unique characters. Bitmap images store pixels plus metadata; higher resolution and colour depth usually improve detail or colour range but increase size.",
                "Digital sound samples an analogue wave. A higher sample rate records more measurements each second; a higher bit depth records each measurement more precisely.",
              ],
              bullets: [
                "Image size (bits) = width × height × colour depth.",
                "Sound size (bits) = sample rate × duration × bit depth.",
                "Text size (bits) = characters × bits per character.",
              ],
              formula: "image bits = width × height × colour depth",
              visual: {
                kind: "pitch-journey",
                title: "Calculate a media file size",
                caption: "Choose the values for the media type, multiply to get bits, then convert the unit requested.",
                labels: ["Choose values", "Multiply", "Total bits", "Divide by 8", "Bytes"],
              },
            },
            {
              heading: "Compression",
              paragraphs: [
                "Lossless compression reduces size without discarding data, so the original can be reconstructed. Lossy compression permanently removes selected data for a greater reduction and may reduce quality.",
              ],
              visual: {
                kind: "compression",
                title: "Lossless or lossy?",
                caption: "Match the method to whether exact recovery or smaller distribution size matters most.",
                labels: ["Original", "Compress", "Smaller file", "Restore or lose detail"],
              },
            },
          ],
          keyTerms: [
            { term: "Volatile", definition: "Loses its contents when power is removed." },
            { term: "Metadata", definition: "Data describing a file, such as image dimensions." },
            { term: "Overflow", definition: "A result too large for the available number of bits." },
            { term: "Lossless compression", definition: "Compression from which the original data can be exactly restored." },
          ],
          commonMistakes: [
            "Confusing RAM with permanent file storage.",
            "Mixing up sample rate and bit depth.",
            "Giving a file-size answer in bits when the capacity is in bytes without converting.",
            "Assuming hexadecimal stores a different value rather than representing the same binary more compactly for people.",
          ],
          examTips: [
            "Write place values or show conversion steps even when the question does not explicitly request working.",
            "For storage choices, compare at least two scenario-relevant characteristics.",
          ],
          quiz: [
            {
              id: "cs-1-2-q1",
              prompt: "What is the denary value of 10110101?",
              options: ["173", "181", "185", "213"],
              answer: 1,
              explanation: "128 + 32 + 16 + 4 + 1 = 181.",
            },
            {
              id: "cs-1-2-q2",
              prompt: "Which change increases the number of sound measurements taken each second?",
              options: ["Increasing the bit depth", "Increasing the sample rate", "Using lossy compression", "Reducing the duration"],
              answer: 1,
              explanation: "The sample rate is the number of sound measurements, or samples, captured each second.",
            },
            {
              id: "cs-1-2-q3",
              prompt: "A bitmap image is 100 × 50 pixels and uses an 8-bit colour depth. What is its uncompressed file size?",
              options: ["5,000 bits", "40,000 bits", "80,000 bits", "400,000 bits"],
              answer: 1,
              explanation: "100 × 50 × 8 = 40,000 bits.",
            },
          ],
          examQuestions: [
            {
              id: "cs-1-2-e1",
              command: "Calculate",
              marks: 3,
              prompt: "Calculate the size in bytes of a 20-second sound file sampled at 8,000 Hz with a 16-bit depth.",
              guidance: ["Multiply the three values to get bits.", "Convert bits to bytes by dividing by 8.", "Include the unit."],
              model: "8,000 × 20 × 16 = 2,560,000 bits. 2,560,000 ÷ 8 = 320,000 bytes.",
            },
          ],
          durationMinutes: 75,
        }),
        topic({
          id: "cs-1-3",
          code: "1.3",
          title: "Computer networks, connections and protocols",
          summary:
            "Understand network types, hardware, topologies, internet services, addressing and communication protocols.",
          keywords: ["LAN", "WAN", "client-server", "peer-to-peer", "router", "switch", "WAP", "NIC", "star", "mesh", "DNS", "cloud", "IP", "MAC", "TCP/IP", "HTTP", "HTTPS", "FTP", "POP", "IMAP", "SMTP", "layers"],
          sections: [
            {
              heading: "Network types and organisation",
              paragraphs: [
                "A LAN covers a small geographical area and normally uses infrastructure owned or controlled by one organisation. A WAN connects networks across a larger area using third-party infrastructure.",
                "Client-server networks centralise services and management. Peer-to-peer devices share directly, which can be simpler but harder to manage and back up consistently.",
              ],
              visual: {
                kind: "network-topology",
                title: "A star topology",
                caption: "Each device has its own connection to the central switch, so one broken cable normally affects one device.",
                labels: ["Switch", "Client", "Server", "Printer", "WAP"],
              },
            },
            {
              heading: "Hardware, addressing and the internet",
              paragraphs: [
                "A switch forwards frames within a LAN, a router moves packets between networks, a wireless access point connects wireless devices and a NIC provides a device's network interface.",
                "IP addresses identify network locations and may change; MAC addresses identify network interfaces. DNS translates domain names into IP addresses. Hosting stores website resources on a server, while cloud services provide remote storage or processing.",
              ],
              image: {
                src: "images/computer-science/systems-and-security.webp",
                alt: "A classroom computer cutaway shows internal hardware connected through a router to wired and wireless devices, with layered security around the network.",
                caption: "A computer system is physical and connected: components process and store data, network devices move it, and several controls protect it.",
              },
              visual: {
                kind: "pitch-journey",
                title: "From a domain name to a web server",
                caption: "DNS returns the IP address; routers then forward packets towards the server at that address.",
                labels: ["Domain name", "DNS lookup", "IP address", "Router", "Web server"],
              },
            },
            {
              heading: "Protocols and layers",
              paragraphs: [
                "Protocols are agreed rules. TCP/IP supports packet communication; HTTP/HTTPS transfers web content; FTP transfers files; SMTP sends email; POP downloads email, while IMAP synchronises it with the server.",
                "Layers divide networking into manageable sections so standards can change independently and different systems can interoperate.",
              ],
            },
          ],
          keyTerms: [
            { term: "Protocol", definition: "An agreed set of rules for communication." },
            { term: "DNS", definition: "A system that resolves domain names to IP addresses." },
            { term: "Topology", definition: "The arrangement of devices and connections in a network." },
          ],
          commonMistakes: ["Treating a switch, router and server as interchangeable.", "Saying a WAN is simply a wireless network.", "Claiming HTTPS prevents every kind of cyberattack."],
          examTips: ["Name both the protocol and its exact job.", "When comparing topologies, link failure or cost to the diagram's structure."],
          quiz: [
            { id: "cs-1-3-q1", prompt: "Which device forwards data packets between different networks?", options: ["Switch", "Router", "NIC", "WAP"], answer: 1, explanation: "A router directs data packets between networks." },
            { id: "cs-1-3-q2", prompt: "Which protocol sends email from an email client or between email servers?", options: ["IMAP", "FTP", "SMTP", "HTTP"], answer: 2, explanation: "SMTP is used to send email. IMAP and POP are used to retrieve email." },
          ],
          examQuestions: [
            { id: "cs-1-3-e1", command: "Explain", marks: 4, prompt: "Explain two benefits to a school of using a client-server network rather than peer-to-peer networking.", guidance: ["Make two separate points.", "Develop each point in the school context.", "Possible areas include accounts, security, backup or software."], model: "User accounts can be managed centrally, so access can be removed or permissions changed consistently across school computers. Files can also be backed up centrally, making recovery easier if a classroom device fails." },
          ],
          durationMinutes: 55,
        }),
        topic({
          id: "cs-1-4",
          code: "1.4",
          title: "Network security",
          summary: "Recognise common threats and explain how specific prevention methods reduce risk.",
          keywords: ["malware", "phishing", "social engineering", "brute force", "denial of service", "DoS", "interception", "SQL injection", "penetration testing", "firewall", "anti-malware", "access level", "password", "encryption", "physical security"],
          sections: [
            {
              heading: "Threats",
              paragraphs: ["Attackers may exploit software, people or network traffic. Malware performs unwanted actions; social engineering manipulates people; brute force repeatedly guesses credentials; DoS overwhelms a service; interception captures data; SQL injection places malicious database commands into an input."],
              visual: { kind: "security-layers", title: "Security works in layers", caption: "Different controls protect against different attack routes; one control cannot stop every threat.", labels: ["Physical", "Firewall", "Access control", "Encryption", "Protected data"] },
            },
            {
              heading: "Prevention",
              paragraphs: ["Controls work in layers. Firewalls filter network traffic, anti-malware detects malicious code, access levels restrict permissions, strong passwords reduce guessing, encryption makes intercepted data unreadable without a key, and physical security restricts direct access. Penetration testing finds weaknesses before attackers do."],
              example: "Encrypting customer records does not stop theft, but it reduces disclosure because the stolen data cannot be understood without the key.",
            },
          ],
          keyTerms: [
            { term: "Social engineering", definition: "Manipulating a person into revealing information or performing an unsafe action." },
            { term: "Penetration testing", definition: "Authorised attempts to find and report security weaknesses." },
            { term: "Encryption", definition: "Scrambling data so it can be understood only using the correct key." },
          ],
          commonMistakes: ["Listing controls without explaining how they counter the threat.", "Saying encryption prevents data from being stolen.", "Confusing DoS with malware that deletes files."],
          examTips: ["Use the named threat from the scenario in your explanation.", "Separate prevention from reducing the consequences after an incident."],
          quiz: [
            { id: "cs-1-4-q1", prompt: "Which attack adds malicious commands to a database input?", options: ["Brute-force attack", "SQL injection", "Denial-of-service attack", "Phishing"], answer: 1, explanation: "SQL injection uses a poorly protected database input to run malicious commands." },
            { id: "cs-1-4-q2", prompt: "What is the main purpose of user access levels?", options: ["To make every file public", "To limit data and actions to authorised users", "To increase the CPU clock speed", "To remove the need for passwords"], answer: 1, explanation: "Access levels limit users to the data and actions that they need for their role." },
          ],
          examQuestions: [
            { id: "cs-1-4-e1", command: "Explain", marks: 4, prompt: "Explain two ways a hospital could reduce the impact of unauthorised access to patient records.", guidance: ["Choose two distinct controls.", "Explain the mechanism of each.", "Apply the consequence to confidential records."], model: "Role-based access means a receptionist cannot open clinical notes they do not need. Encrypting stored records means copied files remain unreadable without the decryption key." },
          ],
          durationMinutes: 40,
        }),
        topic({
          id: "cs-1-5",
          code: "1.5",
          title: "Systems software",
          summary: "Explain how operating systems manage a computer and how utility software performs maintenance tasks.",
          keywords: ["operating system", "user interface", "memory management", "multitasking", "peripheral", "driver", "user management", "file management", "utility", "encryption software", "defragmentation", "compression"],
          sections: [
            {
              heading: "Operating-system functions",
              paragraphs: ["The operating system provides a user interface and manages memory, multitasking, peripherals, users and files. A device driver lets the operating system communicate with a particular hardware device."],
              bullets: ["Memory management allocates and frees RAM.", "Multitasking shares processor time among running processes.", "User management controls accounts and permissions.", "File management organises, names, moves and protects files."],
              visual: { kind: "pitch-journey", title: "User → operating system → hardware", caption: "The operating system provides services between applications and the computer's hardware.", labels: ["User", "Application", "Operating system", "Driver", "Hardware"] },
            },
            {
              heading: "Utilities",
              paragraphs: ["Utility software maintains, protects or optimises a system. Encryption utilities protect data confidentiality, compression reduces file size and defragmentation reorganises fragments on magnetic disks to reduce access movement."],
            },
          ],
          keyTerms: [
            { term: "Operating system", definition: "System software that manages hardware resources and provides services for users and applications." },
            { term: "Driver", definition: "Software that enables the operating system to communicate with a hardware device." },
            { term: "Utility software", definition: "Software that maintains, protects or optimises a computer system." },
          ],
          commonMistakes: ["Describing an operating system as only a user interface.", "Claiming defragmentation is useful for every SSD.", "Confusing a driver with the physical device."],
          examTips: ["Explain both what is managed and why it is needed.", "Choose utilities that fit the scenario rather than listing all three."],
          quiz: [
            { id: "cs-1-5-q1", prompt: "Which operating-system function gives each running process space in RAM?", options: ["File compression", "Memory management", "Defragmentation", "Authentication"], answer: 1, explanation: "Memory management allocates space in RAM and helps to stop processes from interfering with each other." },
            { id: "cs-1-5-q2", prompt: "What does a device driver do?", options: ["It allows the operating system to communicate with a hardware device", "It stores every user file", "It replaces the CPU", "It creates a network password"], answer: 0, explanation: "A device driver allows the operating system to communicate with a particular hardware device." },
          ],
          durationMinutes: 30,
        }),
        topic({
          id: "cs-1-6",
          code: "1.6",
          title: "Ethical, legal, cultural and environmental impacts",
          summary: "Consider competing stakeholder views, relevant UK laws and open-source versus proprietary software.",
          keywords: ["ethical", "legal", "cultural", "environmental", "privacy", "stakeholder", "Data Protection Act", "DPA 2018", "Computer Misuse Act", "CMA 1990", "Copyright Designs and Patents Act", "CDPA 1988", "open source", "proprietary", "digital divide", "e-waste"],
          sections: [
            {
              heading: "Impacts and stakeholders",
              paragraphs: ["Technology can create benefits and harms for different groups. Consider privacy, employment, accessibility, unequal access, energy use, electronic waste, online culture and the environment. A justified conclusion weighs the scenario rather than saying technology is simply good or bad."],
              visual: { kind: "stakeholder-map", title: "Who is affected?", caption: "Compare effects on users, organisations, employees, communities and the environment.", labels: ["Users", "Organisation", "Workers", "Society", "Environment"] },
            },
            {
              heading: "UK legislation",
              paragraphs: ["The Data Protection Act 2018 regulates personal-data processing. The Computer Misuse Act 1990 covers unauthorised access and related misuse. The Copyright, Designs and Patents Act 1988 protects creators' work from unauthorised copying and distribution."],
            },
            {
              heading: "Open-source and proprietary software",
              paragraphs: ["Open-source software makes source code available under its licence, supporting inspection and modification. Proprietary software keeps source code controlled by its owner. Compare licence cost, support, compatibility, customisation and responsibility for maintenance."],
            },
          ],
          keyTerms: [
            { term: "Stakeholder", definition: "A person or group affected by a decision or system." },
            { term: "Personal data", definition: "Information relating to an identified or identifiable person." },
            { term: "Open source", definition: "Software whose source code is available under a licence that permits specified use or modification." },
          ],
          commonMistakes: ["Naming a law without applying what it regulates.", "Producing a one-sided extended response.", "Assuming open source means no licence or no copyright."],
          examTips: ["Use every bullet named in an extended-response question.", "Make a supported recommendation connected to the organisation's priorities."],
          quiz: [
            { id: "cs-1-6-q1", prompt: "Which law covers unauthorised access to a computer system?", options: ["Data Protection Act 2018", "Computer Misuse Act 1990", "Copyright, Designs and Patents Act 1988", "Freedom of Information Act 2000"], answer: 1, explanation: "The Computer Misuse Act 1990 covers unauthorised access and other forms of computer misuse." },
            { id: "cs-1-6-q2", prompt: "What is one possible benefit of open-source software?", options: ["It can never contain bugs", "Its source code can be inspected and changed if the licence allows it", "It is not protected by copyright", "It always includes guaranteed support"], answer: 1, explanation: "Open-source software allows people to inspect and change its source code, as long as they follow the licence." },
          ],
          examQuestions: [
            { id: "cs-1-6-e1", command: "Discuss", marks: 8, prompt: "A council plans to replace face-to-face enquiries with an AI-powered online service. Discuss the ethical, cultural and environmental impacts of this decision.", guidance: ["Cover all three named areas.", "Consider more than one stakeholder and both benefits and drawbacks.", "Reach a supported conclusion using the council context."], model: "A high-level response would compare improved 24-hour access and possibly reduced travel with exclusion of residents who lack access or confidence, privacy and bias concerns, changes to local employment, and the energy used by online infrastructure. Its conclusion would recommend a mixed service if inclusion and accountability outweigh the savings." },
          ],
          durationMinutes: 45,
        }),
      ],
    },
    {
      id: "j277-paper-2",
      code: "J277/02",
      title: "Paper 2: Computational thinking, algorithms and programming",
      description: "Algorithm design, programming fundamentals, robust programs, Boolean logic, translators and IDEs.",
      assessment: "External written examination. Section A is 50 marks; Section B is 30 marks of designing, writing, testing and refining algorithms.",
      weight: "50% · 80 marks · 1 hour 30 minutes",
      topics: [
        topic({
          id: "cs-2-1",
          code: "2.1",
          title: "Algorithms",
          summary: "Use computational thinking to design, trace, correct and compare algorithms, searches and sorts.",
          keywords: ["abstraction", "decomposition", "algorithmic thinking", "input process output", "pseudocode", "OCR ERL", "flowchart", "trace table", "sequence", "selection", "iteration", "linear search", "binary search", "bubble sort", "merge sort", "insertion sort"],
          sections: [
            {
              heading: "Computational thinking and design",
              paragraphs: ["Abstraction keeps relevant detail and removes distraction. Decomposition breaks a problem into manageable parts. Algorithmic thinking creates a precise sequence of steps. Represent algorithms using clear pseudocode, OCR Exam Reference Language, flowcharts or suitable diagrams."],
              image: {
                src: "images/computer-science/programming-problem-solving.webp",
                alt: "Students understand and decompose a problem, plan an algorithm, write and run code, test different cases, identify a bug, fix it and confirm a working solution.",
                caption: "Programming is an improvement cycle: understand, plan, build, test, debug and refine until the solution meets the original problem.",
              },
              visual: { kind: "algorithm-flow", title: "A decision has two possible paths", caption: "Follow the arrows from Start and use the condition to choose the Yes or No path.", labels: ["Start", "Input mark", "mark ≥ 40?", "Display pass", "Display retry", "End"] },
            },
            {
              heading: "Tracing and comparing",
              paragraphs: ["Dry-run an algorithm using a trace table. Record values only when they change and follow selection and loop boundaries exactly. Compare algorithms using correctness, number of steps, memory needs and suitability for the data."],
              visual: { kind: "plan-create-review", title: "Trace one instruction at a time", caption: "Read the next instruction, update any value, record the change, then repeat until the algorithm ends.", labels: ["Read line", "Update value", "Record change", "Next line"] },
            },
            {
              heading: "Searching and sorting",
              paragraphs: ["Linear search checks items in order and works on unsorted data. Binary search repeatedly halves a sorted search area. Bubble sort swaps adjacent out-of-order items; insertion sort inserts each item into the sorted portion; merge sort splits, sorts and merges lists."],
              example: "Binary search for 42 in [4, 12, 19, 42, 57] checks the middle 19, discards the lower half, then checks 42.",
              visual: { kind: "pitch-journey", title: "Binary search keeps halving the search area", caption: "The list must be sorted. Compare with the middle item and discard the half that cannot contain the target.", labels: ["Sorted list", "Check middle", "Compare", "Discard half", "Repeat or found"] },
            },
          ],
          keyTerms: [
            { term: "Abstraction", definition: "Removing unnecessary detail to focus on information needed to solve a problem." },
            { term: "Decomposition", definition: "Breaking a problem into smaller sub-problems." },
            { term: "Trace table", definition: "A table recording how variable values and outputs change while an algorithm runs." },
          ],
          commonMistakes: ["Using binary search on unsorted data.", "Skipping a loop's first or last iteration.", "Writing vague English that cannot be executed unambiguously."],
          examTips: ["Trace one line at a time and do not calculate mentally several iterations ahead.", "For write/refine questions, use OCR ERL or a recognisable high-level language."],
          quiz: [
            { id: "cs-2-1-q1", prompt: "What must be true before a binary search can be used?", options: ["The data must be sorted", "The list must contain text", "The list must have an even number of items", "Every value must be different"], answer: 0, explanation: "A binary search needs sorted data so that it can discard half of the remaining items after each comparison." },
            { id: "cs-2-1-q2", prompt: "Which sorting algorithm repeatedly swaps neighbouring values that are in the wrong order?", options: ["Insertion sort", "Merge sort", "Bubble sort", "Binary sort"], answer: 2, explanation: "A bubble sort compares neighbouring values and swaps them when they are in the wrong order." },
          ],
          examQuestions: [
            { id: "cs-2-1-e1", command: "Design", marks: 6, prompt: "Design an algorithm that inputs ten temperatures and outputs the highest temperature and how many readings were below zero.", guidance: ["Initialise the maximum from a valid value or first input.", "Use a loop for exactly ten readings.", "Update the maximum and a separate below-zero counter."], model: "highest = -1000\nbelow = 0\nfor i = 1 to 10\n  temp = input()\n  if temp > highest then highest = temp\n  if temp < 0 then below = below + 1\nnext i\nprint(highest)\nprint(below)" },
          ],
          durationMinutes: 65,
        }),
        topic({
          id: "cs-2-2",
          code: "2.2",
          title: "Programming fundamentals",
          summary: "Use variables, data types, operators, control structures, strings, files, arrays, subprograms and SQL.",
          keywords: ["variable", "constant", "assignment", "operator", "integer", "real", "Boolean", "character", "string", "casting", "file", "record", "array", "procedure", "function", "parameter", "return", "scope", "random", "SQL", "SELECT FROM WHERE"],
          sections: [
            {
              heading: "Data and control",
              paragraphs: ["Variables hold values that may change; constants are named values intended not to change. Choose suitable data types and use arithmetic, comparison and Boolean operators. Programs combine sequence, selection and iteration."],
              visual: { kind: "algorithm-flow", title: "Selection chooses which code runs", caption: "The Boolean condition sends execution down one of two paths before the program continues.", labels: ["Start", "Input mark", "mark ≥ 40?", "Display pass", "Display retry", "End"] },
            },
            {
              heading: "Collections and reusable code",
              paragraphs: ["Strings are sequences of characters. One-dimensional arrays store a list and two-dimensional arrays use rows and columns. Records group fields about one entity. Procedures perform tasks; functions return values. Parameters pass values in, while scope controls where identifiers can be used."],
            },
            {
              heading: "Files, random values and SQL",
              paragraphs: ["File handling preserves data after a program ends. Random generation supports simulations and games. GCSE SQL retrieves selected fields using SELECT, FROM and WHERE conditions."],
              example: "SELECT Name FROM Players WHERE Score > 100",
              visual: { kind: "pitch-journey", title: "Read an SQL query in order", caption: "SELECT chooses fields, FROM names the table and WHERE keeps only records that match the condition.", labels: ["SELECT fields", "FROM table", "WHERE condition", "Matching records"] },
            },
          ],
          keyTerms: [
            { term: "Assignment", definition: "Storing a value in a variable." },
            { term: "Parameter", definition: "A value supplied to a subprogram when it is called." },
            { term: "Array", definition: "An indexed structure storing multiple values of the same general type." },
            { term: "Casting", definition: "Converting a value from one data type to another." },
          ],
          commonMistakes: ["Confusing assignment with equality comparison.", "Taking new input when a supplied parameter already contains the value.", "Printing a total inside a loop when only the final total is required.", "Forgetting that array indices may start at zero in the language shown."],
          examTips: ["Use meaningful variable names and follow the requested inputs and outputs exactly.", "Keep a solution simple; extra code creates more opportunities for logic errors."],
          quiz: [
            { id: "cs-2-2-q1", prompt: "What is the purpose of a return value?", options: ["To repeat a loop", "To send a result back from a function", "To make every variable global", "To read data from a file"], answer: 1, explanation: "A return value sends a result from a function back to the code that called it." },
            { id: "cs-2-2-q2", prompt: "Which SQL keyword names the table to search?", options: ["SELECT", "FROM", "WHERE", "ORDER"], answer: 1, explanation: "FROM names the table, SELECT chooses the fields and WHERE filters the records." },
          ],
          examQuestions: [
            { id: "cs-2-2-e1", command: "Write", marks: 5, prompt: "Write an algorithm that outputs every value above 50 in an array called scores containing 20 values.", guidance: ["Loop across all 20 valid positions.", "Test the current array element.", "Output only qualifying values."], model: "for index = 0 to 19\n  if scores[index] > 50 then\n    print(scores[index])\n  endif\nnext index" },
          ],
          durationMinutes: 80,
        }),
        topic({
          id: "cs-2-3",
          code: "2.3",
          title: "Producing robust programs",
          summary: "Design defensively, make code maintainable and test it with carefully chosen data.",
          keywords: ["defensive design", "misuse", "authentication", "validation", "maintainability", "comments", "indentation", "subprogram", "iterative testing", "final testing", "syntax error", "logic error", "normal", "boundary", "invalid", "erroneous", "test plan"],
          sections: [
            {
              heading: "Defensive and maintainable design",
              paragraphs: ["Defensive design anticipates accidental and deliberate misuse through validation, authentication and controlled access. Meaningful names, indentation, comments and subprograms make code easier to understand, change, reuse and debug."],
              visual: { kind: "plan-create-review", title: "Design → test → refine", caption: "Testing is repeated during development and again against the completed requirements.", labels: ["Anticipate", "Validate", "Test", "Correct", "Retest"] },
            },
            {
              heading: "Errors and test data",
              paragraphs: ["A syntax error breaks the language's rules; a logic error allows execution but produces an incorrect result. Normal data should be accepted, boundary data tests exact limits, invalid data is the correct type but outside rules, and erroneous data is the wrong type."],
              bullets: ["A test plan records test data, reason/type, expected result, actual result and action.", "Iterative testing happens throughout development; final testing checks the completed solution."],
            },
          ],
          keyTerms: [
            { term: "Validation", definition: "Checking that input follows defined rules; it does not prove the data is true." },
            { term: "Logic error", definition: "An error that produces an unintended result even though the program can run." },
            { term: "Boundary data", definition: "Values at the exact limits of an accepted range." },
          ],
          commonMistakes: ["Saying validation proves data is correct.", "Describing testing as a maintainability technique without explaining code readability.", "Using just-inside values when asked specifically for boundary values."],
          examTips: ["For range 1 to 10 inclusive, boundary values are 1 and 10; invalid near-boundary values are 0 and 11.", "When refining code, state the corrected line or logic rather than only naming the error."],
          quiz: [
            { id: "cs-2-3-q1", prompt: "A valid age must be from 13 to 18, including both limits. Which pair is boundary data?", options: ["12 and 19", "13 and 18", "14 and 17", "'thirteen' and 18.5"], answer: 1, explanation: "Boundary data uses the exact limits of the valid range, which are 13 and 18." },
            { id: "cs-2-3-q2", prompt: "Which feature makes a program easier to maintain?", options: ["Unclear one-letter names", "One very long block of code", "Meaningful names for subprograms", "Removing indentation"], answer: 2, explanation: "Meaningful names and smaller subprograms help another programmer understand and change the code." },
          ],
          examQuestions: [
            { id: "cs-2-3-e1", command: "Create", marks: 4, prompt: "Create four test cases for an integer quantity that must be from 1 to 50 inclusive: one normal, two boundary and one erroneous case.", guidance: ["Label each type.", "Use exact accepted limits for boundaries.", "Erroneous means the wrong data type.", "Give expected acceptance or rejection."], model: "Normal: 25, accept. Boundary: 1, accept. Boundary: 50, accept. Erroneous: 'ten', reject because it is not an integer." },
          ],
          durationMinutes: 45,
        }),
        topic({
          id: "cs-2-4",
          code: "2.4",
          title: "Boolean logic",
          summary: "Apply AND, OR and NOT to truth tables, expressions and combined logic circuits.",
          keywords: ["Boolean", "AND", "OR", "NOT", "logic gate", "truth table", "logic diagram", "expression", "circuit"],
          sections: [
            {
              heading: "Gates and truth tables",
              paragraphs: ["AND outputs 1 only when both inputs are 1. OR outputs 1 when at least one input is 1. NOT reverses its input. Combined expressions are best solved one gate or bracket at a time."],
              visual: { kind: "boolean-logic", title: "AND, OR and NOT", caption: "Use every input combination, and calculate intermediate outputs before the final output.", labels: ["A", "B", "AND", "OR", "NOT"] },
            },
            {
              heading: "Moving between representations",
              paragraphs: ["You may need to create a truth table from an expression, label an output from a circuit, or draw a circuit from a description. Preserve brackets and follow the connection order."],
              example: "For NOT(A AND B), calculate A AND B first, then reverse that intermediate output.",
              visual: { kind: "pitch-journey", title: "Keep the same logic in every form", caption: "Brackets and wire connections determine which operation happens first when moving between a description, expression, circuit and truth table.", labels: ["Description", "Expression", "Gate order", "Circuit", "Truth table"] },
            },
          ],
          keyTerms: [
            { term: "Boolean", definition: "A data value or expression with two states, usually true/false or 1/0." },
            { term: "Truth table", definition: "A table showing outputs for every possible input combination." },
          ],
          commonMistakes: ["Treating OR as exactly one input rather than one or both.", "Applying NOT to the wrong part of an expression.", "Skipping intermediate columns in a combined truth table."],
          examTips: ["Add an intermediate column for each gate.", "Check that a two-input table contains four input combinations."],
          quiz: [
            { id: "cs-2-4-q1", prompt: "What is the result of 1 OR 1?", options: ["0", "1", "Undefined", "It depends on NOT"], answer: 1, explanation: "OR gives a result of 1 when either input, or both inputs, are 1." },
            { id: "cs-2-4-q2", prompt: "What is the result of NOT (1 AND 0)?", options: ["0", "1", "10", "Undefined"], answer: 1, explanation: "1 AND 0 gives 0. NOT changes this 0 to 1." },
          ],
          examQuestions: [
            { id: "cs-2-4-e1", command: "Complete", marks: 3, prompt: "Complete the output column for (A OR B) AND NOT B using input rows 00, 01, 10, 11.", guidance: ["Calculate A OR B.", "Calculate NOT B.", "AND those intermediate results."], model: "Outputs in order: 0, 0, 1, 0." },
          ],
          durationMinutes: 35,
        }),
        topic({
          id: "cs-2-5",
          code: "2.5",
          title: "Programming languages and IDEs",
          summary: "Compare language levels, compilers and interpreters, and explain how IDE features support development.",
          keywords: ["high-level language", "low-level language", "machine code", "translator", "compiler", "interpreter", "IDE", "editor", "error diagnostics", "runtime environment"],
          sections: [
            {
              heading: "Language levels and translation",
              paragraphs: ["High-level languages are designed for human readability and portability. Low-level languages give closer hardware control but are harder for people to write. A translator converts source code because the processor executes machine code."],
              visual: { kind: "pitch-journey", title: "Source code → translator → machine code", caption: "A translator converts human-written source code into instructions the processor can execute.", labels: ["Source code", "Translator", "Machine code", "Processor runs it"] },
            },
            {
              heading: "Compiler, interpreter and IDE",
              paragraphs: ["A compiler creates translated executable code and reports errors after compilation; an interpreter translates and executes line by line, often stopping at an error. An IDE combines an editor, error diagnostics, translator and run-time tools in one development environment."],
            },
          ],
          keyTerms: [
            { term: "Compiler", definition: "A translator that converts a whole source program into machine code before execution." },
            { term: "Interpreter", definition: "A translator that translates and executes source code instruction by instruction." },
            { term: "IDE", definition: "An integrated collection of tools for writing, translating, running and debugging code." },
          ],
          commonMistakes: ["Saying a high-level language is faster simply because it is easier to read.", "Claiming an interpreter creates a permanent executable in the same way as a compiler.", "Naming IDE features without explaining how they help development."],
          examTips: ["Compare translators using translation timing, error feedback, distribution and execution.", "For an IDE feature, state the developer task it makes easier or more reliable."],
          quiz: [
            { id: "cs-2-5-q1", prompt: "Why does a program written in a high-level language need a translator?", options: ["The CPU directly understands Python", "The CPU can execute machine code but not high-level source code", "Every program must use the internet", "A translator increases the amount of RAM"], answer: 1, explanation: "A translator converts high-level source code into machine-code instructions that the CPU can execute." },
            { id: "cs-2-5-q2", prompt: "Which IDE feature helps a programmer find syntax errors?", options: ["Error diagnostics", "File compression", "Defragmentation", "A router"], answer: 0, explanation: "Error diagnostics identify and report code errors to the programmer." },
          ],
          examQuestions: [
            { id: "cs-2-5-e1", command: "Compare", marks: 4, prompt: "Compare using a compiler with using an interpreter while developing and distributing a program.", guidance: ["Give linked differences, not two unrelated definitions.", "Consider error discovery during development.", "Consider whether users need the translator or source code."], model: "An interpreter runs code a line at a time, so a developer can test and locate an error as execution reaches it. A compiler translates the whole program and can produce executable code for distribution, so the user may run it without receiving the source or compiler." },
          ],
          durationMinutes: 35,
        }),
      ],
    },
  ],
};

export default computerScienceCourse;
