using server.Data;
using server.Models;

namespace server.Data;

public static class DataSeeder
{
    public static async Task SeedAsync(DataContext context)
    {
        // Only seed if database is empty
        if (context.Courses.Any()) return;

        // ===== CATEGORIES =====
        var categories = new List<Category>
        {
            new() { Id = Guid.Parse("11111111-0000-0000-0000-000000000001"), Name = "Web Development" },
            new() { Id = Guid.Parse("11111111-0000-0000-0000-000000000002"), Name = "Mobile Development" },
            new() { Id = Guid.Parse("11111111-0000-0000-0000-000000000003"), Name = "Data Science" },
            new() { Id = Guid.Parse("11111111-0000-0000-0000-000000000004"), Name = "Machine Learning" },
            new() { Id = Guid.Parse("11111111-0000-0000-0000-000000000005"), Name = "Cloud & DevOps" },
            new() { Id = Guid.Parse("11111111-0000-0000-0000-000000000006"), Name = "UI/UX Design" },
            new() { Id = Guid.Parse("11111111-0000-0000-0000-000000000007"), Name = "Cybersecurity" },
            new() { Id = Guid.Parse("11111111-0000-0000-0000-000000000008"), Name = "Game Development" },
        };

        if (!context.Categories.Any())
        {
            context.Categories.AddRange(categories);
            await context.SaveChangesAsync();
        }

        var webDevId = categories[0].Id;
        var mobileId = categories[1].Id;
        var dataId = categories[2].Id;
        var mlId = categories[3].Id;
        var cloudId = categories[4].Id;
        var uiId = categories[5].Id;
        var secId = categories[6].Id;
        var gameId = categories[7].Id;

        // High quality Unsplash thumbnails (real images)
        var courses = new List<Course>
        {
            // Web Development
            new() { Title = "The Complete React Developer Course", Description = "Master React 18, hooks, context, Redux Toolkit and build production-ready web apps from scratch.", ThumbnailUrl = "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=640&q=80", CategoryId = webDevId, Level = "Beginner", Language = "English", Price = 89.99m, TotalStudents = 184320, DurationMinutes = 1560 },
            new() { Title = "Next.js 14 – The Full-Stack Framework", Description = "Build blazing fast full-stack apps with Next.js App Router, Server Actions, and Vercel deployment.", ThumbnailUrl = "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=640&q=80", CategoryId = webDevId, Level = "Intermediate", Language = "English", Price = 94.99m, TotalStudents = 97400, DurationMinutes = 1200 },
            new() { Title = "TypeScript Deep Dive", Description = "Go beyond basics with advanced TypeScript: generics, decorators, utility types, and real-world patterns.", ThumbnailUrl = "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=640&q=80", CategoryId = webDevId, Level = "Advanced", Language = "English", Price = 79.99m, TotalStudents = 62100, DurationMinutes = 900 },
            new() { Title = "Vue 3 & Pinia – Modern Frontend", Description = "Build scalable SPAs with Vue 3 Composition API, Pinia, and Vue Router. Includes Vite configuration.", ThumbnailUrl = "https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=640&q=80", CategoryId = webDevId, Level = "Intermediate", Language = "English", Price = 84.99m, TotalStudents = 44800, DurationMinutes = 960 },
            new() { Title = "Node.js & Express – REST API Mastery", Description = "Build secure, scalable REST APIs with Node.js, Express, JWT authentication, and MongoDB.", ThumbnailUrl = "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=640&q=80", CategoryId = webDevId, Level = "Intermediate", Language = "English", Price = 74.99m, TotalStudents = 113000, DurationMinutes = 1080 },
            new() { Title = "HTML & CSS for Beginners", Description = "Start your web developer journey with HTML5, CSS3, Flexbox, Grid, and responsive design fundamentals.", ThumbnailUrl = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=640&q=80", CategoryId = webDevId, Level = "Beginner", Language = "English", Price = 0m, TotalStudents = 250000, DurationMinutes = 720 },
            new() { Title = "GraphQL API Design with Apollo", Description = "Learn to design type-safe GraphQL APIs, write resolvers, use subscriptions and integrate with React.", ThumbnailUrl = "https://images.unsplash.com/photo-1647904383566-a9ab7855aba8?w=640&q=80", CategoryId = webDevId, Level = "Advanced", Language = "English", Price = 99.99m, TotalStudents = 28400, DurationMinutes = 840 },

            // Mobile Development
            new() { Title = "React Native – Cross Platform Apps", Description = "Build iOS and Android apps with React Native, Expo, and native modules. Ship to both stores.", ThumbnailUrl = "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=640&q=80", CategoryId = mobileId, Level = "Intermediate", Language = "English", Price = 89.99m, TotalStudents = 78300, DurationMinutes = 1320 },
            new() { Title = "Flutter & Dart – Zero to Hero", Description = "Create beautiful native apps for iOS, Android, web, and desktop with Flutter 3 and Dart.", ThumbnailUrl = "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=640&q=80", CategoryId = mobileId, Level = "Beginner", Language = "English", Price = 84.99m, TotalStudents = 91200, DurationMinutes = 1440 },
            new() { Title = "SwiftUI for iOS Development", Description = "Build modern iOS apps with SwiftUI, Combine, and Swift 5.9. Publish to App Store.", ThumbnailUrl = "https://images.unsplash.com/photo-1614849963640-9cc74b2a826f?w=640&q=80", CategoryId = mobileId, Level = "Intermediate", Language = "English", Price = 99.99m, TotalStudents = 34700, DurationMinutes = 1080 },
            new() { Title = "Android Development with Kotlin", Description = "Master Android development with Kotlin, Jetpack Compose, ViewModel, and Room database.", ThumbnailUrl = "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=640&q=80", CategoryId = mobileId, Level = "Beginner", Language = "English", Price = 79.99m, TotalStudents = 52000, DurationMinutes = 1200 },

            // Data Science
            new() { Title = "Python for Data Science Bootcamp", Description = "Learn Python, NumPy, Pandas, Matplotlib, and Seaborn for data analysis and visualization.", ThumbnailUrl = "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=640&q=80", CategoryId = dataId, Level = "Beginner", Language = "English", Price = 69.99m, TotalStudents = 312000, DurationMinutes = 1800 },
            new() { Title = "SQL & Database Design Masterclass", Description = "Complete SQL from basics to advanced: joins, CTEs, window functions, query optimization, and PostgreSQL.", ThumbnailUrl = "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=640&q=80", CategoryId = dataId, Level = "Beginner", Language = "English", Price = 59.99m, TotalStudents = 198000, DurationMinutes = 960 },
            new() { Title = "Data Visualization with Power BI", Description = "Transform raw data into compelling dashboards using Power BI Desktop, DAX, and Power Query.", ThumbnailUrl = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=640&q=80", CategoryId = dataId, Level = "Intermediate", Language = "English", Price = 74.99m, TotalStudents = 86400, DurationMinutes = 840 },
            new() { Title = "Statistics for Data Scientists", Description = "Build solid statistical foundations: probability, hypothesis testing, regression analysis, and Bayesian thinking.", ThumbnailUrl = "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=640&q=80", CategoryId = dataId, Level = "Intermediate", Language = "English", Price = 64.99m, TotalStudents = 47300, DurationMinutes = 1080 },
            new() { Title = "Apache Spark & Big Data Processing", Description = "Process large datasets with Apache Spark, PySpark, Databricks, and Delta Lake at enterprise scale.", ThumbnailUrl = "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=640&q=80", CategoryId = dataId, Level = "Advanced", Language = "English", Price = 109.99m, TotalStudents = 22100, DurationMinutes = 1440 },

            // Machine Learning
            new() { Title = "Machine Learning A-Z with Python", Description = "Master supervised, unsupervised, and reinforcement learning with scikit-learn and real datasets.", ThumbnailUrl = "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=640&q=80", CategoryId = mlId, Level = "Intermediate", Language = "English", Price = 94.99m, TotalStudents = 276000, DurationMinutes = 2160 },
            new() { Title = "Deep Learning with TensorFlow", Description = "Build and train neural networks, CNNs, RNNs, and Transformers with TensorFlow 2 and Keras.", ThumbnailUrl = "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=640&q=80", CategoryId = mlId, Level = "Advanced", Language = "English", Price = 109.99m, TotalStudents = 148000, DurationMinutes = 1920 },
            new() { Title = "Natural Language Processing with BERT", Description = "Build NLP applications: text classification, NER, Q&A, and fine-tune BERT models with HuggingFace.", ThumbnailUrl = "https://images.unsplash.com/photo-1655720828018-edd2daec9349?w=640&q=80", CategoryId = mlId, Level = "Advanced", Language = "English", Price = 119.99m, TotalStudents = 38900, DurationMinutes = 1200 },
            new() { Title = "Computer Vision with OpenCV & PyTorch", Description = "Master image processing, object detection, segmentation, and build real-time vision applications.", ThumbnailUrl = "https://images.unsplash.com/photo-1561736778-92e52a7769ef?w=640&q=80", CategoryId = mlId, Level = "Advanced", Language = "English", Price = 104.99m, TotalStudents = 29700, DurationMinutes = 1320 },
            new() { Title = "Generative AI & Prompt Engineering", Description = "Build AI-powered apps with LLMs, master prompt engineering, RAG, and LangChain fundamentals.", ThumbnailUrl = "https://images.unsplash.com/photo-1676277791608-ac54525aa94d?w=640&q=80", CategoryId = mlId, Level = "Intermediate", Language = "English", Price = 89.99m, TotalStudents = 67200, DurationMinutes = 960 },
            new() { Title = "MLOps: Production Machine Learning", Description = "Deploy ML models at scale with MLflow, Kubeflow, feature stores, and CI/CD for machine learning.", ThumbnailUrl = "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=640&q=80", CategoryId = mlId, Level = "Advanced", Language = "English", Price = 114.99m, TotalStudents = 18400, DurationMinutes = 1560 },

            // Cloud & DevOps
            new() { Title = "AWS Solutions Architect Associate", Description = "Prepare for the AWS SAA exam: EC2, S3, RDS, Lambda, VPC, IAM, and cloud architecture best practices.", ThumbnailUrl = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=640&q=80", CategoryId = cloudId, Level = "Intermediate", Language = "English", Price = 99.99m, TotalStudents = 203000, DurationMinutes = 1800 },
            new() { Title = "Docker & Kubernetes Complete Guide", Description = "Containerize apps with Docker, orchestrate with Kubernetes (K8s), and deploy to production clusters.", ThumbnailUrl = "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=640&q=80", CategoryId = cloudId, Level = "Intermediate", Language = "English", Price = 89.99m, TotalStudents = 124000, DurationMinutes = 1440 },
            new() { Title = "CI/CD Pipelines with GitHub Actions", Description = "Automate builds, tests, and deployments with GitHub Actions, Docker, and Kubernetes end-to-end.", ThumbnailUrl = "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=640&q=80", CategoryId = cloudId, Level = "Intermediate", Language = "English", Price = 79.99m, TotalStudents = 54200, DurationMinutes = 840 },
            new() { Title = "Terraform – Infrastructure as Code", Description = "Provision and manage cloud infrastructure on AWS, Azure, and GCP with Terraform and GitOps.", ThumbnailUrl = "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=640&q=80", CategoryId = cloudId, Level = "Advanced", Language = "English", Price = 94.99m, TotalStudents = 41100, DurationMinutes = 1080 },
            new() { Title = "Google Cloud Professional Engineer", Description = "Master GCP services: Compute Engine, GKE, BigQuery, Cloud Run, and professional exam prep.", ThumbnailUrl = "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=640&q=80", CategoryId = cloudId, Level = "Advanced", Language = "English", Price = 104.99m, TotalStudents = 29800, DurationMinutes = 1560 },
            new() { Title = "Linux & Shell Scripting Fundamentals", Description = "Master the Linux command line, bash scripting, process management, and system administration.", ThumbnailUrl = "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=640&q=80", CategoryId = cloudId, Level = "Beginner", Language = "English", Price = 0m, TotalStudents = 167000, DurationMinutes = 720 },

            // UI/UX Design
            new() { Title = "UI/UX Design Bootcamp with Figma", Description = "Design stunning interfaces from wireframes to prototypes. Learn design systems, components, and user research.", ThumbnailUrl = "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=640&q=80", CategoryId = uiId, Level = "Beginner", Language = "English", Price = 74.99m, TotalStudents = 134000, DurationMinutes = 1200 },
            new() { Title = "Design Systems at Scale", Description = "Build enterprise-grade design systems with tokens, component libraries, documentation, and team workflows.", ThumbnailUrl = "https://images.unsplash.com/photo-1558655146-d09347e92766?w=640&q=80", CategoryId = uiId, Level = "Advanced", Language = "English", Price = 94.99m, TotalStudents = 23700, DurationMinutes = 900 },
            new() { Title = "Motion Design & Micro-animations", Description = "Create delightful UI animations with CSS, Framer Motion, and Lottie for modern web applications.", ThumbnailUrl = "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=640&q=80", CategoryId = uiId, Level = "Intermediate", Language = "English", Price = 84.99m, TotalStudents = 31200, DurationMinutes = 720 },
            new() { Title = "User Research & Usability Testing", Description = "Plan and conduct user research, usability tests, interviews, and translate insights into design decisions.", ThumbnailUrl = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=640&q=80", CategoryId = uiId, Level = "Intermediate", Language = "English", Price = 79.99m, TotalStudents = 18600, DurationMinutes = 840 },
            new() { Title = "Accessibility in Web Design (WCAG 2.2)", Description = "Build inclusive products: color contrast, keyboard navigation, ARIA, and WCAG 2.2 compliance workflows.", ThumbnailUrl = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=640&q=80", CategoryId = uiId, Level = "Intermediate", Language = "English", Price = 0m, TotalStudents = 42800, DurationMinutes = 600 },

            // Cybersecurity
            new() { Title = "Ethical Hacking & Penetration Testing", Description = "Learn offensive security: network scanning, exploitation, web vulnerabilities, and professional pentesting.", ThumbnailUrl = "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=640&q=80", CategoryId = secId, Level = "Intermediate", Language = "English", Price = 109.99m, TotalStudents = 87400, DurationMinutes = 1680 },
            new() { Title = "Web Application Security (OWASP Top 10)", Description = "Defend against SQLi, XSS, CSRF, SSRF, and prototype pollution. Hands-on labs with vulnerable apps.", ThumbnailUrl = "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=640&q=80", CategoryId = secId, Level = "Intermediate", Language = "English", Price = 89.99m, TotalStudents = 54300, DurationMinutes = 1080 },
            new() { Title = "Zero Trust Network Architecture", Description = "Design and implement zero trust security models, microsegmentation, and identity-based access control.", ThumbnailUrl = "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=640&q=80", CategoryId = secId, Level = "Advanced", Language = "English", Price = 114.99m, TotalStudents = 16200, DurationMinutes = 960 },
            new() { Title = "CompTIA Security+ Certification Prep", Description = "Comprehensive security certification prep: threats, cryptography, identity, PKI, and risk management.", ThumbnailUrl = "https://images.unsplash.com/photo-1598128558393-70ff21433be0?w=640&q=80", CategoryId = secId, Level = "Beginner", Language = "English", Price = 79.99m, TotalStudents = 68900, DurationMinutes = 1200 },
            new() { Title = "Malware Analysis & Reverse Engineering", Description = "Analyze malware samples, understand assembly language, and use IDA Pro, Ghidra, and x64dbg.", ThumbnailUrl = "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=640&q=80", CategoryId = secId, Level = "Advanced", Language = "English", Price = 124.99m, TotalStudents = 11800, DurationMinutes = 1440 },

            // Game Development
            new() { Title = "Unity Game Development – Complete Course", Description = "Build 2D and 3D games with Unity 6, C#, physics, AI, UI systems, and publish to multiple platforms.", ThumbnailUrl = "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=640&q=80", CategoryId = gameId, Level = "Beginner", Language = "English", Price = 89.99m, TotalStudents = 156000, DurationMinutes = 2400 },
            new() { Title = "Unreal Engine 5 – Blueprint & C++", Description = "Create AAA-quality games with UE5 Lumen, Nanite, MetaHuman, Blueprint visual scripting, and C++.", ThumbnailUrl = "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=640&q=80", CategoryId = gameId, Level = "Intermediate", Language = "English", Price = 99.99m, TotalStudents = 72300, DurationMinutes = 2160 },
            new() { Title = "Godot 4 – Open Source 2D Game Dev", Description = "Build polished 2D games with Godot 4, GDScript, tilemap, shaders, and export to web and mobile.", ThumbnailUrl = "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=640&q=80", CategoryId = gameId, Level = "Beginner", Language = "English", Price = 0m, TotalStudents = 38700, DurationMinutes = 1200 },
            new() { Title = "Shader Programming & Visual Effects", Description = "Write custom shaders in HLSL/GLSL, create VFX with particle systems, and optimize rendering pipelines.", ThumbnailUrl = "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=640&q=80", CategoryId = gameId, Level = "Advanced", Language = "English", Price = 94.99m, TotalStudents = 19400, DurationMinutes = 1080 },
            new() { Title = "Game Design Fundamentals", Description = "Master core game design principles: mechanics, balance, player psychology, level design, and monetization.", ThumbnailUrl = "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=640&q=80", CategoryId = gameId, Level = "Beginner", Language = "English", Price = 69.99m, TotalStudents = 44100, DurationMinutes = 840 },

            // Mixed — more popular courses
            new() { Title = "Fullstack Development with ASP.NET Core & React", Description = "Build enterprise apps with ASP.NET Core 8, EF Core, Clean Architecture, and React 18 frontend.", ThumbnailUrl = "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=640&q=80", CategoryId = webDevId, Level = "Advanced", Language = "English", Price = 119.99m, TotalStudents = 48700, DurationMinutes = 2880 },
            new() { Title = "Microservices with .NET & RabbitMQ", Description = "Design and deploy microservices using .NET 8, Docker, RabbitMQ, API Gateway, and Kubernetes.", ThumbnailUrl = "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=640&q=80", CategoryId = cloudId, Level = "Advanced", Language = "English", Price = 114.99m, TotalStudents = 31500, DurationMinutes = 2160 },
            new() { Title = "Data Engineering with dbt & Snowflake", Description = "Build modern data pipelines with dbt Core, Snowflake, Airflow, and data warehouse best practices.", ThumbnailUrl = "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=640&q=80", CategoryId = dataId, Level = "Advanced", Language = "English", Price = 109.99m, TotalStudents = 17900, DurationMinutes = 1440 },
            new() { Title = "Product Design with AI Tools", Description = "Leverage Midjourney, Adobe Firefly, and AI design assistants to supercharge your UI/UX workflow.", ThumbnailUrl = "https://images.unsplash.com/photo-1648737963503-1a26da876aca?w=640&q=80", CategoryId = uiId, Level = "Beginner", Language = "English", Price = 0m, TotalStudents = 29800, DurationMinutes = 480 },
            new() { Title = "The Complete Git & GitHub Masterclass", Description = "Master Git branching strategies, merge conflicts, rebasing, GitHub Actions, and team collaboration workflows.", ThumbnailUrl = "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=640&q=80", CategoryId = webDevId, Level = "Beginner", Language = "English", Price = 0m, TotalStudents = 389000, DurationMinutes = 600 },
        };

        // Seed hot searches
        var hotSearchKeywords = new[] { "React", "Python", "Machine Learning", "Next.js", "AWS", "Docker", "TypeScript", "Flutter", "Unity", "SQL" };
        var searchLogs = new List<SearchLog>();
        var rng = new Random(42);
        foreach (var kw in hotSearchKeywords)
        {
            int count = rng.Next(20, 80);
            for (int i = 0; i < count; i++)
                searchLogs.Add(new SearchLog { Query = kw, SearchedAt = DateTime.UtcNow.AddDays(-rng.Next(1, 30)) });
        }

        context.Courses.AddRange(courses);
        context.SearchLogs.AddRange(searchLogs);
        await context.SaveChangesAsync();

        Console.WriteLine($"✅ Seeded {courses.Count} courses, {categories.Count} categories, {searchLogs.Count} search logs.");
    }
}
