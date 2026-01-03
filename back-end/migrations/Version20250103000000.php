<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Migration pour ajouter la table Category et modifier la relation dans Product
 */
final class Version20250103000000 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Crée la table Category et transforme le champ category de Product en relation ManyToOne';
    }

    public function up(Schema $schema): void
    {
        // Création de la table category
        $this->addSql('CREATE TABLE category (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, slug VARCHAR(255) NOT NULL, description LONGTEXT DEFAULT NULL, UNIQUE INDEX UNIQ_64C19C15E237E06 (name), UNIQUE INDEX UNIQ_64C19C1989D9B62 (slug), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        
        // Insertion des catégories par défaut
        $this->addSql("INSERT INTO category (name, slug, description) VALUES ('Mobilier', 'mobilier', 'Meubles et éléments d''ameublement pour votre intérieur')");
        $this->addSql("INSERT INTO category (name, slug, description) VALUES ('Objet de décoration', 'objet-de-decoration', 'Objets décoratifs pour embellir votre espace')");
        
        // Ajout d'une colonne temporaire pour stocker l'ancien category_name
        $this->addSql('ALTER TABLE product ADD category_id INT DEFAULT NULL, ADD category_old VARCHAR(255) DEFAULT NULL');
        
        // Copie des anciennes valeurs
        $this->addSql('UPDATE product SET category_old = category');
        
        // Mise à jour des relations basées sur les anciennes valeurs
        $this->addSql("UPDATE product SET category_id = (SELECT id FROM category WHERE name = 'Mobilier') WHERE category_old LIKE '%mobilier%' OR category_old LIKE '%Mobilier%'");
        $this->addSql("UPDATE product SET category_id = (SELECT id FROM category WHERE name = 'Objet de décoration') WHERE category_old LIKE '%décoration%' OR category_old LIKE '%decoration%' OR category_old LIKE '%Décoration%'");
        
        // Pour les produits qui n'ont pas de correspondance, on les met en "Objet de décoration" par défaut
        $this->addSql("UPDATE product SET category_id = (SELECT id FROM category WHERE slug = 'objet-de-decoration') WHERE category_id IS NULL");
        
        // Suppression de l'ancienne colonne category
        $this->addSql('ALTER TABLE product DROP category, DROP category_old');
        
        // Ajout de la contrainte NOT NULL et de la clé étrangère
        $this->addSql('ALTER TABLE product CHANGE category_id category_id INT NOT NULL');
        $this->addSql('ALTER TABLE product ADD CONSTRAINT FK_D34A04AD12469DE2 FOREIGN KEY (category_id) REFERENCES category (id)');
        $this->addSql('CREATE INDEX IDX_D34A04AD12469DE2 ON product (category_id)');
    }

    public function down(Schema $schema): void
    {
        // Suppression de la relation
        $this->addSql('ALTER TABLE product DROP FOREIGN KEY FK_D34A04AD12469DE2');
        $this->addSql('DROP INDEX IDX_D34A04AD12469DE2 ON product');
        
        // Ajout de l'ancienne colonne category
        $this->addSql('ALTER TABLE product ADD category VARCHAR(255) NOT NULL');
        
        // Récupération des noms de catégories
        $this->addSql('UPDATE product p INNER JOIN category c ON p.category_id = c.id SET p.category = c.name');
        
        // Suppression de category_id
        $this->addSql('ALTER TABLE product DROP category_id');
        
        // Suppression de la table category
        $this->addSql('DROP TABLE category');
    }
}

